module ActiveAdmin
  class AdminUserPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        if user.admin?
          scope.all
        else
          scope.where(id: user.id)
        end
      end
    end

    def index?
      user.admin?
    end

    def show?
      user.admin? || record == user
    end

    def create?
      user.admin?
    end

    def new?
      create?
    end

    def update?
      user.admin? || record == user
    end

    def edit?
      update?
    end

    def destroy?
      user.admin?
    end

    def destroy_all?
      user.admin?
    end
  end
end
