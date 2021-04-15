var NotaryArtifact = artifacts.require("./Notary.sol");

contract("NotaryContract", function(accounts) {
  it('This is my TestCase', function() {
    return NotaryArtifact.deployed().then(function(instance)  {
      // here we can access instance
  //    console.log(instance);
    })
  });



it('should not have an Entry for a test-Hash', async function() {
  return NotaryArtifact.deployed().then(async function(instance) {
    try {
    await instance.entrySet("0xA441B15FE9A3CF56661190A0B93B9DEC7D04127288CC87250967CF3B52894D11");
  } catch(error) {
    console.log("Here is the error message:" + error.message);
    // we have an error, let's test it:
  //  console.log("There is an ERROR HURRAAAAAAAAAY!!!!");
    if(error.message.search("revert") >= 0) {
  //    console.log("It gets into the inner loop TOOOOOOO!!!!!");
      assert.equal(error.message.search("revert") > 0, true, "Error Message does not reflect expected Exception Message.");
    } else {
      throw error;
    }
  }
  })
});

it('should be able to add and then read an entry', async () => {
  let instance = await NotaryArtifact.deployed();
  await instance.addEntry("0xBF5EDF964FA06FC290FF5741301581BEBE70E0057AB54142E2FE75C1F82EFE5A", "test", "test");
  let entry = await instance.entrySet("0xBF5EDF964FA06FC290FF5741301581BEBE70E0057AB54142E2FE75C1F82EFE5A");
  console.log(entry);
});


});
