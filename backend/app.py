import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from postgrest import APIError
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_PUBLISHABLE_KEY")

if not supabase_url or not supabase_key:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY environment variables are required"
    )

supabase: Client = create_client(supabase_url, supabase_key)


@app.after_request
def enable_cors(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    return response


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "name": "Events API",
        "endpoints": {
            "browse_events": "GET /api/events",
            "event_details": "GET /api/events/{id}",
            "create_registration": "POST /api/registrations",
            "my_registrations": "GET /api/me/registrations",
            "attendee_list": "GET /api/events/{id}/registrations",
        },
    })


@app.route("/api/events", methods=["GET"])
def get_events():
    try:
        response = supabase.table("events").select("*").execute()
        return jsonify(response.data), 200
    except Exception as error:
        return database_error(error)


@app.route("/api/events/<event_id>", methods=["GET"])
def get_event(event_id):
    try:
        response = (
            supabase.table("events")
            .select("*")
            .eq("id", event_id)
            .limit(1)
            .execute()
        )
        if not response.data:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(response.data[0]), 200
    except Exception as error:
        return database_error(error)


@app.route("/api/registrations", methods=["POST"])
def create_registration():
    data = request.get_json(silent=True) or {}
    user_id = data.get("user_id")
    event_id = data.get("event_id")

    if not user_id or not event_id:
        return jsonify({"error": "user_id and event_id are required"}), 400

    try:
        event_response = (
            supabase.table("events")
            .select("*")
            .eq("id", event_id)
            .limit(1)
            .execute()
        )
        if not event_response.data:
            return jsonify({"error": "Event not found"}), 404

        duplicate_response = (
            supabase.table("registrations")
            .select("id")
            .eq("user_id", user_id)
            .eq("event_id", event_id)
            .limit(1)
            .execute()
        )
        if duplicate_response.data:
            return jsonify({"error": "Registration already exists"}), 409

        event = event_response.data[0]
        if event.get("status") not in (None, "open"):
            return jsonify({"error": "Event is not open for registration"}), 409

        capacity = event.get("capacity")
        if capacity is not None:
            registration_count = (
                supabase.table("registrations")
                .select("id", count="exact")
                .eq("event_id", event_id)
                .execute()
            )
            if registration_count.count is not None and registration_count.count >= capacity:
                return jsonify({"error": "Event is full"}), 409

        response = (
            supabase.table("registrations")
            .insert({"user_id": user_id, "event_id": event_id})
            .select("*")
            .execute()
        )
        if not response.data:
            return jsonify({"error": "Registration could not be created"}), 409
        return jsonify(response.data[0]), 201
    except Exception as error:
        return database_error(error)


@app.route("/api/me/registrations", methods=["GET"])
def get_my_registrations():
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id query parameter is required"}), 400

    try:
        response = (
            supabase.table("registrations")
            .select("*, events(*)")
            .eq("user_id", user_id)
            .execute()
        )
        return jsonify(response.data), 200
    except Exception as error:
        return database_error(error)


@app.route("/api/events/<event_id>/registrations", methods=["GET"])
def get_event_registrations(event_id):
    organizer_id = request.args.get("organizer_id")
    if not organizer_id:
        return jsonify({"error": "organizer_id query parameter is required"}), 400

    try:
        event_response = (
            supabase.table("events")
            .select("organizer_id")
            .eq("id", event_id)
            .limit(1)
            .execute()
        )
        if not event_response.data:
            return jsonify({"error": "Event not found"}), 404
        if event_response.data[0].get("organizer_id") != organizer_id:
            return jsonify({"error": "Only the event organizer can view attendees"}), 403

        response = (
            supabase.table("registrations")
            .select("*, users(*)")
            .eq("event_id", event_id)
            .execute()
        )
        return jsonify(response.data), 200
    except Exception as error:
        return database_error(error)


def database_error(error):
    if isinstance(error, APIError):
        message = getattr(error, "message", str(error))
    else:
        message = str(error)
    return jsonify({"error": "Database operation failed", "details": message}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=False)
