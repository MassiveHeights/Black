/* @echo EXPORT */
class Assert {
  constructor() {
    Assert.is(false, 'Static class');
  }

  static is(value, message) {
    if (value === true)
      return;

    if (Assert.logOnFail)
      console.error('[ASSERT]', message);

    if (Assert.throwOnFail)
      throw new Error(message);
  }
}

Assert.throwOnFail = false;
Assert.logOnFail = true;
