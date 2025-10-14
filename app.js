const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const icToggle = $('#icToggle');
const trainBadge = $('#trainBadge');
const trainTitle = $('#trainTitle');
const addRowBtn = $('#addRowBtn');
const tableBody = $('#ttTable tbody');

icToggle.addEventListener('change', () => {
  if (icToggle.checked) {
    trainBadge.textContent = 'IC';
    trainTitle.textContent = '177 Metropolitan InterCity';
  } else {
    trainBadge.textContent = 'EC';
    trainTitle.textContent = '177 Metropolitan EuroCity';
  }
});

addRowBtn.addEventListener('click', () => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input type="time" aria-label="Indulás"></td>
    <td><input type="time" aria-label="Érkezés"></td>
    <td><input type="text" placeholder="Állomás" aria-label="Állomás"></td>
    <td><input type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Vág." aria-label="Vágány"></td>
    <td class="note-cell">
      <div class="note-inputs">
        <select class="icon-picker" aria-label="Piktogram">
          <option value="">— Nincs —</option>
          <option value="A">A (példa)</option>
          <option value="B">B (példa)</option>
          <option value="C">C (példa)</option>
        </select>
        <input type="text" class="note-text" placeholder="Megjegyzés…" />
      </div>
      <span class="mnr-icon preview" aria-hidden="true"></span>
    </td>
  `;
  tableBody.appendChild(tr);
  wireRow(tr);
});

function wireRow(tr) {
  const picker = $('.icon-picker', tr);
  const preview = $('.mnr-icon.preview', tr);
  const noteText = $('.note-text', tr);

  const updatePreview = () => {
    preview.textContent = picker.value || '';
  };

  picker.addEventListener('change', updatePreview);
  noteText.addEventListener('input', () => {});
  updatePreview();
}

$$('#ttTable tbody tr').forEach(wireRow);
