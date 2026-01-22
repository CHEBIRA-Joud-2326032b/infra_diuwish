package handlers

import (
	"Diu-Wish/internal/api/service"
	"Diu-Wish/internal/middleware"
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

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.Error(c, http.StatusBadRequest, "Données manquantes ou format invalide")
		return
	}

	if len(input.Password) < 8 {
		utils.Error(c, http.StatusBadRequest, "Le mot de passe doit contenir au moins 8 caractères")
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
			utils.Error(c, http.StatusConflict, "Cet email est déjà utilisé")
			return
		}
		utils.Error(c, http.StatusInternalServerError, "Une erreur interne est survenue")
		return
	}

	utils.Success(c, http.StatusCreated, "Compte créé avec succès", userToCreate)
}

func (h *UserHandler) HandleLogin(c *gin.Context) {
	var input models.LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		utils.Error(c, http.StatusBadRequest, "Format des données invalide")
		return
	}

	user, errService := h.service.Authenticate(input.Email, input.Password, c.Request.Context())
	if errService != nil {
		utils.Error(c, http.StatusUnauthorized, "Email ou mot de passe incorrect")
		return
	}

	token, errMiddleware := middleware.CreateToken(user.ID)
	if errMiddleware != nil {
		utils.Error(c, http.StatusInternalServerError, "Impossible de générer le token")
		return
	}

	c.SetCookie("Authorization", token, 60*15, "", "", false, true)
	utils.Success(c, http.StatusOK, "Connexion réussie", user)
}

func (h *UserHandler) HandleGetUser(c *gin.Context) {
	id := c.Param("id")

	user, errService := h.service.GetProfile(id, c.Request.Context())
	if errService != nil {
		utils.Error(c, http.StatusNotFound, "Utilisateur introuvable")
		return
	}

	utils.Success(c, http.StatusOK, "Profil récupéré", user)
}
