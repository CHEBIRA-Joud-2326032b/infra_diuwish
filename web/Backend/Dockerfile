# Étape 1 : Le "Builder"
FROM golang:alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main ./cmd/main.go

# Étape 2 : Le "Runner"
FROM alpine:latest
WORKDIR /app

# --- AJOUT ICI : Installation des fuseaux horaires ---
RUN apk add --no-cache tzdata
# -----------------------------------------------------

COPY --from=builder /app/main .
COPY --from=builder /app/.env .

EXPOSE 8080
CMD ["./main"]