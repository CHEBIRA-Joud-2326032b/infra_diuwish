package handlers

import (
	"Diu-Wish/internal/api/service"
	"Diu-Wish/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type AccountHandler struct {
	service *service.AccountService
}

func AccountHandlerInit(service *service.AccountService) *AccountHandler {
	return &AccountHandler{service}
}

func (h *AccountHandler) HandleDeposit(c *gin.Context) {
	id := c.Param("id")

	intID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"status":  "error",
			"message": "Conversion de l'id impossible",
		})
	}

	var input models.DepositInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	errService := h.service.Deposit(intID, input.Amount, c.Request.Context())
	if errService != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": errService.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Dépôt effectué avec succès"})
}
