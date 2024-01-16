require "rails_helper"

RSpec.describe ContactMailer, type: :mailer do
  describe 'send_contact_email' do
    let(:name) { 'John Doe' }
    let(:email) { 'johndoe@example.com' }
    let(:message) { 'Ceci est un message de test.' }
    let(:mail) { ContactMailer.send_contact_email(name, email, message) }

    it 'renders the headers' do
      expect(mail.subject).to eq("Message de #{name}")
      expect(mail.to).to eq(['mohamed.bengrich@outlook.fr'])
      expect(mail.from).to eq([email])
    end

    it 'renders the body' do
      expect(mail.body.encoded).to match(name)
      expect(mail.body.encoded).to match(message)
    end
  end
end
