class Api::V1::BaseController < Api::BaseController
  class Unauthorized < StandardError; end

  rescue_from StandardError, with: :internal_server_error
  rescue_from Unauthorized, with: :unauthorized
  rescue_from ActiveRecord::RecordInvalid, with: :invalid
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActionController::ParameterMissing, with: :param_missing

  private

  def not_found(exception)
    render json: {code: :not_found, message: exception.message}, status: :not_found
  end

  def invalid(exception)
    render json: {code: :invalid, message: exception.message}, status: :unprocessable_entity
  end

  def unauthorized(exception)
    render json: {code: :unauthorized, message: exception.message}, status: :unauthorized
  end

  def param_missing(exception)
    render json: {code: :param_missing, message: exception.message}, status: :bad_request
  end

  def internal_server_error(exception)
    raise unless Rails.env.production?

    # Setup bugsnag and uncomment this line
    # Bugsnag.notify(exception)

    render json: {code: :internal_server_error, message: "errors.internal_server_error"}, status: :internal_server_error
  end
end
