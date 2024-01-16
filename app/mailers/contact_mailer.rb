class ContactMailer < ApplicationMailer
    def send_contact_email(name, email, message)
        @name = name
        @message = message
        @email = email
        add_attachments

        mail(from: email, to: 'mohamed.bengrich@outlook.fr', subject: "Message de #{name}")
    end

    private

    def add_attachments
        attachments.inline["home-logo.svg"] = File.read("app/assets/images/home-logo.svg")
    end
end
