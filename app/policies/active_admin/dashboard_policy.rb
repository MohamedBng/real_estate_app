# app/policies/session_policy.rb
module ActiveAdmin
  class DashboardPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        scope.none
      end
    end

    def dashboard?
      true
    end

    def index?
      true
    end
  end
end
