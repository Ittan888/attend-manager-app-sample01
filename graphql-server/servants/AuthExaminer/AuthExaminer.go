package AuthExaminer

import (
	"demo13/prisma"
	"context"
	// "log"
	"github.com/hako/branca"
	"github.com/joho/godotenv"
	"os"
	"strings"
)

type AuthExaminer struct {
	authToken string
	Prisma *prisma.Client
}

func Summon(authToken string, prisma *prisma.Client) *AuthExaminer {
	return &AuthExaminer{
		authToken: authToken,
		Prisma: prisma,
	}
}

func (a *AuthExaminer) ServeAuthResult(ctx context.Context) (bool, error) {
	// var re bool

	// only development
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	b := branca.NewBranca(os.Getenv("SECRET_KEY"))

	message, err := b.DecodeToString(a.authToken)

	adminInfo := strings.Split(message, "/")
	

	_, reterr := a.Prisma.Admins(&prisma.AdminsParams{
		Where: &prisma.AdminWhereInput{
			Email:    &adminInfo[0],
			Password: &adminInfo[1],
		},
	}).Exec(ctx)

	
	if reterr != nil {
		return false, reterr
	} else {
		return true, reterr
	}
}