import { ContactInterface } from "../interfaces/contact.interface";
import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { submitcontactrequest } from "../model.mock";
import { FakeApiService } from "./fakeapi.service";

describe('fakeapi', () => {

it('should dispatch success action on successful API response', (done) => {
  const fakeapi = new FakeApiService();

  let res: ContactInterface;
  fakeapi.submitData({
    name: "test",
    linkedinUrl: "test",
    email: "test",
    snackbar: {
      message: ""
    }
  } ,true).subscribe((data) => { //true - simulate successful response
    res = data;

    const expected: ContactInterface = {
      id: "",
      name: "test",
      email: "test",
      linkedinUrl: "test"
    };
    expect(res).toEqual(expected);
    done();
  });
  done();
});

    
xit('should dispatch failiure action on failed API response', (done) => {
  const fakeapi = new FakeApiService();

  let res: ContactInterface;
  fakeapi.submitData({
    name: "",
    linkedinUrl: "",
    email: "",
    snackbar: {
      message: ""
    }
  } ,true).subscribe((data) => { //false - simulate unsuccessful response
    res = data;

    const expected: ContactInterface = {
      id: "",
      name: "",
      email: "",
      linkedinUrl: ""
    };
    expect(res).toEqual(expected);
    done();
  });

  done();
});

});