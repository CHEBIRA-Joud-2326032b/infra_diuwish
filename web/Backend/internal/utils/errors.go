package utils

import (
	"errors"

	"github.com/jackc/pgx/v5/pgconn"
)

var (
	ErrDuplicate = errors.New("enregistrement déjà existant")
	ErrNotFound  = errors.New("enregistrement introuvable")
)

func TransformDBError(err error) error {

	if err == nil {
		return nil
	}

	var psqlErr *pgconn.PgError

	if errors.As(err, &psqlErr) {
		switch psqlErr.Code {
		case "23505":
			return ErrDuplicate
		}
	}

	return err
}
