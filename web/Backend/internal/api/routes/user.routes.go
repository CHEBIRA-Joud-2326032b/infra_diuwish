package routes

import (
	"Diu-Wish/internal/api/handlers"

	"github.com/gin-gonic/gin"
)

func SetupUserRoutes(router *gin.Engine, handler *handlers.UserHandler) {
	router.POST("/register", handler.HandleRegister)
	router.POST("/login", handler.HandleLogin)
	router.GET("/users/:id", handler.HandleGetUser)
}
