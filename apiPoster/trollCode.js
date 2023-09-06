var modal = document.getElementById("modal");
var form = document.getElementById("myForm");
var messageDom = document.getElementById("modal-content");
var closeBtn = document.getElementsByClassName("close")[0];

function showModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function handleSubmit(event) {
  event.preventDefault();

  var messages = [
    "Cross-referencing mainframe debug executor...",
    "Resetting interrupt request...",
    "Base64 encoding array databytes...",
    "Algorithmically caching coprocessor output log via readable stream...",
    "Swapping signed and unsigned bits...",
    "Storing keys assigned to hexadecimal cascade...",
    "Encrypting cross-origin stack overflow...",
    "Formatting z coordinates to distro hash...",
    "Reticulating aggregate net memory...",
    "Recursively subdividing Euclidean space into convex sets...",
    "Inverting binary cryptographic memory userspace...",
    "Cleansing X086 inline assembly...",
    "Abstracting polymorphic middleware APIs",
    "Complete. You may now close this window."
  ];

  function sleep(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  async function displayMessages() {
    for (var m = 0; m < messages.length; m++) {
      var text = messages[m];

      await sleep(2000);

      var node = document.createTextNode(text);
      messageDom.appendChild(node);
      messageDom.appendChild(document.createElement("br"));
    }
  }

  displayMessages().then(() => {
    closeModal();
  });
}

form.addEventListener("submit", handleSubmit);
closeBtn.addEventListener("click", closeModal);


