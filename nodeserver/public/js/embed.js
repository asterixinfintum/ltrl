const embed = document.getElementById("embed");

let useraddress;

let ethereumprice;
let usdtprice = 1;
let assetprice = 0.10875;

let buttonlabel = 'Connect wallet';

useraddress = `connect to interact`;

const returninput = (buttonname, buttonlogo, role) => {
    const inputtemp = `
        <div class="input">
            <div class="input__top">
                <span class="input__inputrole">${role}</span>
            </div>
            <div class="input__bottom">
                ${role === 'You pay' ?
            `<input class="input__input" id="valueinput" inputmode="decimal" autocomplete="off" autocorrect="off" type="number" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.00" minlength="1" maxlength="79" spellcheck="false" min="0.02" value=""/>`
            :
            `<input class="input__input" id="amountofasset" inputmode="decimal" autocomplete="off" autocorrect="off" type="number" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.00" minlength="1" maxlength="79" spellcheck="false" min="0.02" value=""/>`
        }
                
                ${role === 'You pay' ?
            `<div class="input__buttonbody">
                <div class="input__modal">
                    <div class="input__modal--item" id="https://token-icons.s3.amazonaws.com/eth.png">
                        <span class="input__button--logo flex-align input__modal--itemlogo">
                            <img src="https://token-icons.s3.amazonaws.com/eth.png"/>
                        </span>
                        <span>ETH</span>
                    </div>
                    <div class="input__modal--item" id="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png">
                        <span class="input__button--logo flex-align input__modal--itemlogo">
                            <img src="https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"/>
                        </span>
                        <span>USDT</span>
                    </div>
                </div>
                <button class="input__button" id="toggleassetdropdown">
                    <span class="input__button--logo flex-align">
                        <img src="https://token-icons.s3.amazonaws.com/eth.png" id="dropdownlogo"/>
                    </span>
                    <span class="input__inputname flex-align" id="buttonname">${buttonname}</span>
                    <span class="flex-align" id="buttonsvg">
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" class="SwapCurrencyInputPanel__StyledDropDown-sc-bc2530e8-8 fsTYVk"><path d="M0.97168 1L6.20532 6L11.439 1" stroke="#AEAEAE"></path></svg>
                    </span>
                </button>
            </div>` :
            `<button class="input__button">
                        <span class="input__button--logo flex-align">
                            <span class="token-symbol">H</span>
                        </span>
                        <span class="input__inputname flex-align">${buttonname}</span>
                    </button>`
        }
            </div>
            ${role === 'You pay' ?
            `<div class="input__blcval">
                <div class="input__blcval--val">
                    <span id="dollarprice"></span>
                </div>
                <div class="input__blcval--blc">
                    <span>Balance:</span>
                    <span id="currentbalance">0</span>
                </div>
            </div>` :
            `<div class="input__blcval">
            <div class="input__blcval--val">
                <span>price: $0.10875</span>
            </div>
            <div class="input__blcval--blc">
                <span></span>
            </div>
        </div>`}
        </div>
    `;

    return inputtemp;
}

const returninputarrow = () => {
    return `
    <div class="input__box">
        <div class="input__arrow">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </span>
        </div>
    </div>
    `
}

const returnuseraddress = (addr) => {
    return `<div class="embedform__useraddress" id="useraddr">${shortenString(addr, 20)}</div>`;
}

const returnbutton = () => {
    return `<button class="connect" id="connectbtn">${buttonlabel}</button>`

}

const form = `
    <div class="embedform">
        ${returnuseraddress(useraddress)}
        ${returninput('ETH', '', 'You pay')}
        ${returninputarrow()}
        ${returninput('HPLT', '', 'You receive')}
        ${returnbutton()}
    </div>
`;

embed.insertAdjacentHTML('beforeend', form);


function shortenString(str, maxLength) {
    // Check if the current length is less than the maximum allowed length
    if (str.length <= maxLength) {
        return str;  // Return the original string if it's within the limit
    }

    // Calculate the length of each half to keep around the ellipsis
    let partLength = Math.floor((maxLength - 3) / 2); // Subtract 3 to account for the ellipsis

    // Get the first part from the beginning of the string
    let firstPart = str.substring(0, partLength);

    // Get the second part from the end of the string
    let secondPart = str.substring(str.length - partLength);

    // Return the string with the ellipsis in the middle
    return `${firstPart}...${secondPart}`;
}

function mobilewidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
        return true;
    } else {
        return false;
    }
}

function getethereumPrice() {
    fetch('/getcryptoprices')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Ether price:', data.etherprice);
            ethereumprice = data.etherprice;
            // Here you can update your webpage with the received Ether price
            document.getElementById('priceDisplay').textContent = 'Ether Price: $' + data.etherprice;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}