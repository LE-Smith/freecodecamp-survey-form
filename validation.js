const submitBtn = document.getElementById('submit');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const favColorInput = document.getElementById('dropdown');
const commentsInput = document.getElementById('comments');

const nameLabel = document.getElementById('name-label');
const emailLabel = document.getElementById('email-label');
const numberLabel = document.getElementById('number-label');

let nameNotValid, emailNotValid;
let numberNotValid = false;

nameInput.addEventListener('input', event => {
  validFn('name', true, nameInput, nameLabel, 'Name', 'Please enter a name!');
});

emailInput.addEventListener('input', event => {
  validFn(
    'email',
    true,
    emailInput,
    emailLabel,
    'Email',
    'Please enter a valid email address!'
  );
});

numberInput.addEventListener('input', event => {
  validFn(
    'number',
    false,
    numberInput,
    numberLabel,
    'How satisfied are you?',
    'Please enter a number between 0 and 100!'
  );
});

const manageSubmit = () => {
  if (nameNotValid || emailNotValid || numberNotValid) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Form Data is not valid!';
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
};

const validFn = (
  type,
  required,
  inputEl,
  inputLabel,
  labelTextValid,
  labelTextNotValid
) => {
  const notValidFn = () => {
    inputLabel.textContent = labelTextNotValid;
    inputLabel.classList.add('label-not-valid');
    inputEl.classList.add('not-valid');
  };

  const validFn = () => {
    inputLabel.textContent = labelTextValid;
    inputLabel.classList.remove('label-not-valid');
    inputEl.classList.remove('not-valid');
  };

  const emailRegEx = /^.+@.+\..+$/;

  switch (type) {
    case 'name':
      if (inputEl.value.trim() === '' && required) {
        nameNotValid = true;
        notValidFn();
      } else {
        nameNotValid = false;
        validFn();
      }
      break;
    case 'email':
      if (!emailRegEx.test(inputEl.value.trim()) && required) {
        emailNotValid = true;
        notValidFn();
      } else {
        emailNotValid = false;
        validFn();
      }
      break;
    case 'number':
      if (
        parseInt(inputEl.value.trim()) < 0 ||
        parseInt(inputEl.value.trim()) > 100
      ) {
        numberNotValid = true;
        notValidFn();
      } else {
        numberNotValid = false;
        validFn();
      }
      break;
  }

  manageSubmit();
};

submitBtn.addEventListener('click', event => {
  event.preventDefault();

  validFn('name', true, nameInput, nameLabel, 'Name', 'Please enter a name!');
  validFn(
    'email',
    true,
    emailInput,
    emailLabel,
    'Email',
    'Please enter a valid email address!'
  );

  manageSubmit();

  const genderInputs = document.querySelectorAll('input[name="gender"]');

  let genderInputVal = document.querySelector('input[name="gender"]:checked')
    ? document.querySelector('input[name="gender"]:checked').value
    : '';
  let hobbiesInputs = document.querySelectorAll('input[name="hobbies"]:checked')
    ? document.querySelectorAll('input[name="hobbies"]:checked')
    : '';

  let hobbiesArr = [];
  hobbiesInputs.forEach(hobby => hobbiesArr.push(hobby.defaultValue));
  console.log(hobbiesInputs);

  if (!nameNotValid && !emailNotValid && !numberNotValid) {
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      number: numberInput.value,
      favColor: favColorInput.value,
      gender: genderInputVal,
      hobbies: hobbiesArr.join('; '),
      message: commentsInput.value,
    };
    console.log('your entered data as Object: ', formData);

    nameInput.value = '';
    emailInput.value = '';
    numberInput.value = '';
    favColorInput.value = '';
    genderInputs.forEach(input => (input.checked = false));
    hobbiesInputs.forEach(input => (input.checked = false));
    commentsInput.value =
      'Your data was transferred successfully to the console.log ;)';
  }
});
