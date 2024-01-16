class ContactController < ApplicationController
    skip_forgery_protection
    def send_email
        name = params[:name]
        email = params[:email]
        message = params[:message]

        if ContactMailer.send_contact_email(name, email, message).deliver_now
          render json: { status: "success", message: "Votre message a bien été envoyé" }
        else
          render json: { status: "error", message: "Erreur lors de l'envoi du message" }, status: :unprocessable_entity
        end
    end
end
