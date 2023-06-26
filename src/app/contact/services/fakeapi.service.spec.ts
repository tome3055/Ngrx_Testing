import { SubmitContactResponseSuccess } from "../interfaces/submitcontactresponse.interface";
import { submitcontactrequest } from "../model.mock";
import { FakeApiService } from "./fakeapi.service";

describe('fakeapi', () => {

it('should dispatch success action on successful API response', (done) => {
  const fakeapi = new FakeApiService();

  let res: SubmitContactResponseSuccess;
  fakeapi.submitData(submitcontactrequest ,true).subscribe((data) => { //true - simulate successful response
    res = data;

    const expected: SubmitContactResponseSuccess = {
      success: true,
      data: 'Data submitted successfully'
    };
    expect(res).toEqual(expected);
    done();
  });
  done();
});

    
it('should dispatch failiure action on failed API response', (done) => {
  const fakeapi = new FakeApiService();

  let res: SubmitContactResponseSuccess;
  fakeapi.submitData(submitcontactrequest ,true).subscribe((data) => { //false - simulate unsuccessful response
    res = data;

    const expected: SubmitContactResponseSuccess = { 
    success: false, 
    data: 'Error submitting data'
    };
    expect(res).toEqual(expected);
    done();
  });

  done();
});

});