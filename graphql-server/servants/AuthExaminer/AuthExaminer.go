package AuthExaminer

import (
	// "demo13/prisma"
	"log"
	"github.com/hako/branca"
	"github.com/joho/godotenv"
	"os"
	"strings"
)

type AuthExaminer struct {
	authToken string
}

func Summon(authToken string) *AuthExaminer {
	return &AuthExaminer{ authToken: authToken }
}

func (a *AuthExaminer) ServeAuthResult() (bool, error) {
	// var re bool

	// only development
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	b := branca.NewBranca(os.Getenv("SECRET_KEY"))

	message, err := b.DecodeToString(a.authToken)

	adminInfo := strings.Split(message, "/")
	log.Printf("%v",adminInfo[0])
	log.Printf("%v",adminInfo[1])

	panic("")
}