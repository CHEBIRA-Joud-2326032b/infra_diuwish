package routes

import (
	"Diu-Wish/internal/api/handlers"
	"Diu-Wish/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupAccountRoutes(router *gin.Engine, handler *handlers.AccountHandler) {
	router.POST("/account/:id/deposit", middleware.RequireAuth, handler.HandleDeposit)
	router.POST("/account/:id/withdraw", middleware.RequireAuth, handler.HandleWithdraw)
}
