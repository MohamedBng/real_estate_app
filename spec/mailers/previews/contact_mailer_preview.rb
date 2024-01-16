# Preview all emails at http://localhost:3000/rails/mailers/contact_mailer
class ContactMailerPreview < ActionMailer::Preview
    def score_email
        ContactMailer.send_contact_email("Mohamed", "mohamed.bengrich@outlook.fr", "un message")
    end
end
