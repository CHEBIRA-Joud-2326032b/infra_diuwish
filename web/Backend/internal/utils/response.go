package utils

import "github.com/gin-gonic/gin"

func RespondJSON(c *gin.Context, code int, status string, message string, data interface{}) {
	c.JSON(code, gin.H{
		"status":  status,
		"message": message,
		"data":    data,
	})
}

func Success(c *gin.Context, code int, message string, data interface{}) {
	RespondJSON(c, code, "success", message, data)
}

func Error(c *gin.Context, code int, message string) {
	RespondJSON(c, code, "error", message, nil)
}
