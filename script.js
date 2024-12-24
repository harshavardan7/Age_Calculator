const btnE1 = document.getElementById("btn");
const birthE1 = document.getElementById("birthday");
const resultE1 = document.getElementById("result");

function calculateAge() {
  const birthdayValue = birthE1.value;
  if (birthdayValue === "") {
    alert("Please enter your birthday");
  } else {
    const { years, months, days } = getCompletedAge(birthdayValue);
    const { remainingMonths, remainingDays } = getRemainingMonthsAndDays(birthdayValue);

    resultE1.innerText = `You are ${years} year${years > 1 ? "s" : ""} ${months} month${
      months > 1 ? "s" : ""
    } and ${days} day${days > 1 ? "s" : ""} old. Your next birthday is in ${remainingMonths} month${
      remainingMonths > 1 ? "s" : ""
    } and ${remainingDays} day${remainingDays > 1 ? "s" : ""}.`;
  }
}

function getCompletedAge(birthdayValue) {
  const birthdayDate = new Date(birthdayValue);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthdayDate.getFullYear();
  let months = currentDate.getMonth() - birthdayDate.getMonth();
  let days = currentDate.getDate() - birthdayDate.getDate();

  if (days < 0) {
    const previousMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    days += previousMonthDays;
    months--;
  }

  if (months < 0) {

    months += 12;
    years--;
  }

  return { years, months, days };
}

function getRemainingMonthsAndDays(birthdayValue) {
  const birthdayDate = new Date(birthdayValue);
  const currentDate = new Date();
  let nextBirthday = new Date(
    currentDate.getFullYear(),
    birthdayDate.getMonth(),
    birthdayDate.getDate()
  );

  if (nextBirthday < currentDate) {
    nextBirthday.setFullYear(currentDate.getFullYear() + 1);
  }

  let remainingMonths = nextBirthday.getMonth() - currentDate.getMonth();
  if (remainingMonths < 0) remainingMonths += 12;

  let remainingDays = nextBirthday.getDate() - currentDate.getDate();
  if (remainingDays < 0) {
    const previousMonthDays = new Date(
      nextBirthday.getFullYear(),
      nextBirthday.getMonth(),
      0
    ).getDate();
    remainingDays += previousMonthDays;
    remainingMonths--;
    if (remainingMonths < 0) remainingMonths += 12;
  }

  return { remainingMonths, remainingDays };
}

btnE1.addEventListener("click", calculateAge);
