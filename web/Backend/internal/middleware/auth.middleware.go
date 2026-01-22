package middleware

import (
	"Diu-Wish/internal/config"
	"Diu-Wish/internal/utils"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {
	tokenString, err := c.Request.Cookie("Authorization")
	if err != nil {
		utils.Error(c, http.StatusUnauthorized, "Token manquant")
		c.Abort()
		return
	}

	secretKey := []byte(config.GetEnvVar("SECRET", ""))

	token, err := jwt.Parse(tokenString.Value, func(token *jwt.Token) (any, error) {
		return secretKey, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		utils.Error(c, http.StatusUnauthorized, "Token invalide")
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			utils.Error(c, http.StatusUnauthorized, "Token invalide ou expiré")
			c.Abort()
			return
		}
		c.Next()
	}
}

func CreateToken(userID int) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
		"exp":    time.Now().Add(time.Minute * 15).Unix(),
	})

	secretKey := []byte(config.GetEnvVar("SECRET", ""))

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		fmt.Println(err)
		return "", err
	}

	return tokenString, nil
}
