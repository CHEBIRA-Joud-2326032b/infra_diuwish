package handlers

import (
	"Diu-Wish/internal/api/service"
	"Diu-Wish/internal/models"
	"Diu-Wish/internal/utils"
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
		utils.Error(c, http.StatusBadRequest, "L'ID du compte doit être un string")
		return
	}

	var input models.DepositInput
	if err := c.ShouldBindJSON(&input); err != nil {
		utils.Error(c, http.StatusBadRequest, "Le montant est invalide ou manquant")
		return
	}

	errService := h.service.Deposit(intID, input.Amount, c.Request.Context())
	if errService != nil {
		utils.Error(c, http.StatusBadRequest, errService.Error())
		return
	}

	utils.Success(c, http.StatusOK, "Dépôt effectué avec succès", nil)
}
