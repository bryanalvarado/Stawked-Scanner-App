const validation = require("../providers/Validation");

test("validates email", () => {
  //true tests
  expect(validation.validateEmail("armenfes@gmail.com")).toBe(true);
  expect(validation.validateEmail("jared1@somecompany.com")).toBe(true);
  expect(validation.validateEmail("jarviscampbell334321@somecompany.com")).toBe(
    true
  );

  //false tests
  expect(validation.validateEmail("sdf")).toBe(false);
  expect(validation.validateEmail("test@com")).toBe(false);
  expect(validation.validateEmail("sdf@")).toBe(false);
  expect(validation.validateEmail(".@s.com")).toBe(false);
  expect(validation.validateEmail(".@.com")).toBe(false);
  expect(validation.validateEmail("ff@ssss")).toBe(false);
});

test("validates nickname", () => {
  // true tests
  expect(validation.validateNickname("Sam")).toBe(true);
  expect(validation.validateNickname("1Sam")).toBe(true);
  expect(validation.validateNickname("2Sam")).toBe(true);
  expect(validation.validateNickname("11111a111")).toBe(true);
  expect(validation.validateNickname("SamuelTheGreat")).toBe(true);
  // false tests
  expect(
    validation.validateNickname(
      "Samasdfdfgfghssfghdgfhgdfhfsdfgdgsfdgsdfgsdfghdgfhdhgdfhfgdh"
    )
  ).toBe(false);
  expect(validation.validateNickname("sd")).toBe(false);
  expect(validation.validateNickname("s")).toBe(false);
  expect(validation.validateNickname("222222222")).toBe(false);
  expect(validation.validateNickname("sdf sdf sdf sdf sdf sdf sdf")).toBe(
    false
  );
  expect(validation.validateNickname("samuel fesliyan")).toBe(false);
});
