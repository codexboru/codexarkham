export function createWalletInput(onSubmit) {
  const container = document.createElement('div');
  container.style.marginTop = '1rem';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '0x...';
  input.style.padding = '0.5rem';
  input.style.backgroundColor = '#1a1a1a';
  input.style.color = '#e0e0e0';
  input.style.border = '1px solid #444';
  input.style.marginRight = '0.5rem';

  const button = document.createElement('button');
  button.innerText = 'Entblößen';
  button.style.padding = '0.5rem';
  button.style.backgroundColor = '#1a1a1a';
  button.style.color = '#e0e0e0';
  button.style.border = '1px solid #444';

  button.onclick = () => {
    const wallet = input.value.trim();
    if (wallet) onSubmit(wallet);
  };

  container.appendChild(input);
  container.appendChild(button);
  return container;
}
