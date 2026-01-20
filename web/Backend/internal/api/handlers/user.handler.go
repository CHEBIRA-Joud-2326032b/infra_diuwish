package handlers

import (
	"Diu-Wish/internal/api/service"
	"Diu-Wish/internal/models"
	"Diu-Wish/internal/utils"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	service *service.UserService
}

func UserHandlerInit(service *service.UserService) *UserHandler {
	return &UserHandler{service}
}

func (h *UserHandler) HandleRegister(c *gin.Context) {
	var input models.RegisterInput

	err := c.ShouldBindJSON(&input)
	if len(input.Password) < 8 {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Mot de passe pas assez long",
		})
		return
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Données manquantes ou invalides",
			"error":   err.Error(),
		})
		return
	}

	userToCreate := models.User{
		LastName:  input.LastName,
		FirstName: input.FirstName,
		Email:     input.Email,
		Password:  input.Password,
		Phone:     input.Phone,
	}

	errService := h.service.Register(&userToCreate, c.Request.Context())
	if errService != nil {
		if errors.Is(errService, utils.ErrDuplicate) {
			c.JSON(http.StatusConflict, gin.H{"error": "Cet email existe déjà"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur serveur"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Utilisateur créé",
		"user":    userToCreate,
	})
}

func (h *UserHandler) HandleLogin(c *gin.Context) {
	var input models.LoginInput

	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Données manquantes ou invalides",
			"error":   err.Error(),
		})
		return
	}

	user, errService := h.service.Authenticate(input.Email, input.Password, c.Request.Context())
	if errService != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": "Données invalides",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"message": "Connexion réussie",
		"user":    user,
	})

}

func (h *UserHandler) HandleGetUser(c *gin.Context) {
	id := c.Param("id")

	user, errService := h.service.GetProfile(id, c.Request.Context())
	if errService != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status":  "error",
			"message": errService,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
		"user":   user,
	})
}
