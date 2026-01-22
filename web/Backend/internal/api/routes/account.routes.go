package routes

import (
	"Diu-Wish/internal/api/handlers"

	"github.com/gin-gonic/gin"
)

func SetupAccountRoutes(router *gin.Engine, handler *handlers.AccountHandler) {
	router.POST("/account/:id/deposit", handler.HandleDeposit)
	router.POST("/account/:id/withdraw", handler.HandleWithdraw)
}
