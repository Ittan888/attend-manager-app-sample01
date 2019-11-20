package AttendsDefaultDataManager

import (
	"time"
	"demo13/prisma"
)

type AttendsDefaultDataManager struct {}

func Summon() *AttendsDefaultDataManager {
	return &AttendsDefaultDataManager{}
}

func (a *AttendsDefaultDataManager) ServeData() []prisma.AttendCreateWithoutStaffInfoInput {
	re := []prisma.AttendCreateWithoutStaffInfoInput{}

	jst, _ := time.LoadLocation("Asia/Tokyo")
	now := time.Now().In(jst)
	ut := now.Unix()
	_, offset := now.Zone()

	for i := 0; i < 14; i++ {
		re = append(re, prisma.AttendCreateWithoutStaffInfoInput{
			DateStartTime: time.Unix((ut/86400)*86400-int64(offset), 0).AddDate(0, 0, i).Format(time.RFC3339),
		})
	}

	return re
}