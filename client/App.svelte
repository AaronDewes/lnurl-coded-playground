<script>
  import {bech32} from 'bech32'

  var input = ''
  var output = ''

  function isLightningAddress(address) {
    // ensure only 1 `@` present:
    if (address.split('@').length !== 2) return false;
    const splitted = address.split('@');
    return !!splitted[0].trim() && !!splitted[1].trim();
  }

  function islnurl(s) {
    s = input.toLowerCase()
    if (s.indexOf(':') !== -1) s = s.split(':')[1]
    return s.slice(0, 6) === 'lnurl1'
  }

  function parse(e) {
    e.preventDefault()
    if (islnurl(input)) {
      output = decode(input)
    } else if (isLightningAddress(input)) {
      output = encode(`https://${input.split("@")[1]}/.well-known/lnurlp/${input.split("@")[0]}`)
    } else {
      output = encode(input)
    }
  }

  function decode(lnurl) {
    let p = lnurl.split(/[:=]/)
    lnurl = p.length === 2 ? p[1] : lnurl
    let d = bech32.decode(lnurl, 1500)
    let b = bech32.fromWords(d.words)
    return Buffer.from(b).toString()
  }

  function encode(url) {
    let words = bech32.toWords(Buffer.from(url, 'utf8'))
    return bech32.encode('lnurl', words, 1500)
  }
</script>

<div>
  <h1>lnurl encoder/decoder</h1>
  <form on:submit={parse}>
    <textarea bind:value={input} />
    <button>
      {#if input.length == 0}Parse{:else if islnurl(input)}Decode{:else}Encode{/if}
    </button>
  </form>
  <textarea readonly bind:value={output} />
  <p>
    <a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg" alt="Deploys by Netlify" /> </a>
  </p>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    width: 500px;
    margin: 20px auto;
    font-size: 120%;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    padding: 5px;
  }
  button {
    margin: auto;
    padding: 10px;
  }
</style>
