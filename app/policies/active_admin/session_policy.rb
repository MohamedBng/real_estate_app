module ActiveAdmin
  class SessionPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        scope.none
      end
    end

    def new?
      true
    end

    def create?
      true
    end

    def destroy?
      user.present?
    end
  end
end
