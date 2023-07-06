import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsUtility {
  getFutureDate(now: Date) {
    return new Date(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      ).setDate(now.getUTCDate() + 14 + 1)
    );
  }

  getDeliveryStartDate(now: Date, orderDateDay: number, daysInAdvance: number) {
    return new Date(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      ).setDate(orderDateDay + daysInAdvance)
    );
  }

  checkDate(now: Date, deliveryStartDate: Date, i: number) {
    return new Date(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0
      ).setDate(deliveryStartDate.getUTCDate() + i + 1)
    );
  }

  formateDate(dateIsoString: string) {
    const t = new Date(dateIsoString);
    const timezoneOffset = t.getTimezoneOffset();
    const timeOffsetInHours = timezoneOffset / 60;
    const timeOffsetSign = timezoneOffset < 0 ? "-" : "+";
    const timeOffsetString = `${timeOffsetSign}${Math.abs(timeOffsetInHours)
      .toString()
      .padStart(2, "0")}:00`;
    const deliveryDate = t.toISOString().slice(0, 19) + timeOffsetString;
    return deliveryDate;
  }

  deliveryDates(
    postalCode: number,
    numOfProducts: number,
    deliveryHash: { [date: string]: number }
  ) {
    const availableDeliveryDates = [];

    const deliveryHashKeys = Object.keys(deliveryHash);
    for (let date of deliveryHashKeys) {
      let isGreenDelivery = false;

      // skip the date if only one product can not be delivered in that day.
      if (deliveryHash[date] < numOfProducts) {
        continue;
      }

      // if the day is Tuesday then it is green delivery.
      if (new Date(date).getDay() == 2) {
        isGreenDelivery = true;
      }

      //adjust the date format to match the given date format.
      const deliveryDate = this.formateDate(date);

      // add the date to the list if it is available to deliver the product
      availableDeliveryDates.push({
        postalCode,
        deliveryDate,
        isGreenDelivery,
      });
    }
    const sortedDeliveryDates = this.sortDeliveryArray(availableDeliveryDates);
    return sortedDeliveryDates;
  }

  sortDeliveryArray(
    deliveryArray: {
      postalCode: number;
      deliveryDate: string;
      isGreenDelivery: boolean;
    }[]
  ) {
    const now = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(now.getDate() + 3);

    deliveryArray.sort((a, b) => {
      const aDate = new Date(a.deliveryDate).getTime();
      const bDate = new Date(b.deliveryDate).getTime();

      if (a.isGreenDelivery && aDate < threeDaysFromNow.getTime()) {
        return -1;
      } else if (b.isGreenDelivery && bDate < threeDaysFromNow.getTime()) {
        return 1;
      } else {
        return aDate - bDate;
      }
    });
    return deliveryArray;
  }
}
