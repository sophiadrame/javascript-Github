// Fonction pour prévisualiser la photo
function previewPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            preview.src = e.target.result;
            // Stocker la photo en base64 pour le CV
            preview.dataset.photoData = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// Fonctions pour ajouter des sections dynamiques
function ajouterFormation() {
    const formationsDiv = document.getElementById('formations');
    const nouvelleFormation = document.createElement('div');
    nouvelleFormation.className = 'formation-entry';
    nouvelleFormation.innerHTML = `
        <input type="text" placeholder="Diplôme">
        <input type="text" placeholder="École">
        <input type="text" placeholder="Année">
        <textarea placeholder="Description"></textarea>
        <button onclick="supprimerElement(this.parentElement)" class="supprimer-btn">Supprimer</button>
    `;
    formationsDiv.appendChild(nouvelleFormation);
}

function ajouterExperience() {
    const experiencesDiv = document.getElementById('experiences');
    const nouvelleExperience = document.createElement('div');
    nouvelleExperience.className = 'experience-entry';
    nouvelleExperience.innerHTML = `
        <input type="text" placeholder="Poste">
        <input type="text" placeholder="Entreprise">
        <input type="text" placeholder="Période">
        <textarea placeholder="Description des responsabilités"></textarea>
        <button onclick="supprimerElement(this.parentElement)" class="supprimer-btn">Supprimer</button>
    `;
    experiencesDiv.appendChild(nouvelleExperience);
}

function ajouterCompetence() {
    const competenceInput = document.getElementById('nouvelle-competence');
    const competence = competenceInput.value.trim();
    
    if (competence) {
        const listeCompetences = document.getElementById('liste-competences');
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            ${competence}
            <button onclick="supprimerElement(this.parentElement)">×</button>
        `;
        listeCompetences.appendChild(tag);
        competenceInput.value = '';
    }
}

function ajouterLangue() {
    const languesDiv = document.getElementById('langues');
    const nouvelleLangue = document.createElement('div');
    nouvelleLangue.className = 'langue-entry';
    nouvelleLangue.innerHTML = `
        <input type="text" placeholder="Langue">
        <select class="niveau-langue">
            <option value="Langue maternelle">Langue maternelle</option>
            <option value="Bilingue">Bilingue</option>
            <option value="Courant">Courant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Débutant">Débutant</option>
        </select>
        <button onclick="supprimerElement(this.parentElement)" class="supprimer-btn">Supprimer</button>
    `;
    languesDiv.appendChild(nouvelleLangue);
}

function supprimerElement(element) {
    element.remove();
}

function genererCV() {
    const apercuCV = document.getElementById('apercu-cv');
    apercuCV.classList.remove('hidden');

    // Récupérer la photo
    const photoPreview = document.getElementById('photo-preview');
    const photoData = photoPreview.dataset.photoData || '';

    // Récupérer toutes les informations
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const telephone = document.getElementById('telephone').value;
    const adresse = document.getElementById('adresse').value;

    // Générer le HTML du CV
    let cvHTML = `
        <div class="cv-content">
            ${photoData ? `
                <div class="cv-photo">
                    <img src="${photoData}" alt="Photo de profil">
                </div>
            ` : ''}
            <h1>${prenom} ${nom}</h1>
            <div class="contact-info">
                <p>📧 ${email}</p>
                <p>📱 ${telephone}</p>
                <p>📍 ${adresse}</p>
            </div>

            <h2>Formation</h2>
            <div class="cv-section">
    `;

    // Ajouter les formations
    document.querySelectorAll('.formation-entry').forEach(formation => {
        const inputs = formation.querySelectorAll('input');
        const description = formation.querySelector('textarea').value;
        cvHTML += `
            <div class="cv-item">
                <h3>${inputs[0].value}</h3>
                <p>${inputs[1].value} - ${inputs[2].value}</p>
                <p>${description}</p>
            </div>
        `;
    });

    cvHTML += `
            </div>
            <h2>Expérience Professionnelle</h2>
            <div class="cv-section">
    `;

    // Ajouter les expériences
    document.querySelectorAll('.experience-entry').forEach(experience => {
        const inputs = experience.querySelectorAll('input');
        const description = experience.querySelector('textarea').value;
        cvHTML += `
            <div class="cv-item">
                <h3>${inputs[0].value}</h3>
                <p>${inputs[1].value} - ${inputs[2].value}</p>
                <p>${description}</p>
            </div>
        `;
    });

    cvHTML += `
            </div>
            <h2>Compétences</h2>
            <div class="cv-section competences-section">
    `;

    // Ajouter les compétences
    document.querySelectorAll('.tag').forEach(tag => {
        cvHTML += `<span class="cv-competence">${tag.textContent.replace('×', '')}</span>`;
    });

    cvHTML += `
            </div>
            <h2>Langues</h2>
            <div class="cv-section">
    `;

    // Ajouter les langues
    document.querySelectorAll('.langue-entry').forEach(langue => {
        const nomLangue = langue.querySelector('input').value;
        const niveau = langue.querySelector('select').value;
        if (nomLangue) {
            cvHTML += `
                <div class="cv-item">
                    <h3>${nomLangue}</h3>
                    <p>${niveau}</p>
                </div>
            `;
        }
    });

    cvHTML += `
            </div>
            <h2>Centres d'intérêt</h2>
            <div class="cv-section">
                <p>${interets}</p>
            </div>
        </div>
    `;

    apercuCV.innerHTML = cvHTML;

    // Ajouter des styles spécifiques pour l'aperçu du CV
    const style = document.createElement('style');
    style.textContent = `
        .cv-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        .contact-info {
            margin: 1rem 0;
            color: #666;
        }
        .cv-section {
            margin: 1.5rem 0;
        }
        .cv-item {
            margin-bottom: 1rem;
        }
        .cv-competence {
            background: #e0e0e0;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            margin: 0.2rem;
            display: inline-block;
        }
        .competences-section {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
    `;
    apercuCV.appendChild(style);
}

// Ajouter la possibilité d'imprimer le CV
document.addEventListener('DOMContentLoaded', () => {
    const genererButton = document.getElementById('generer-cv');
    genererButton.addEventListener('click', () => {
        setTimeout(() => {
            const imprimerButton = document.createElement('button');
            imprimerButton.textContent = 'Imprimer le CV';
            imprimerButton.onclick = () => window.print();
            document.getElementById('apercu-cv').appendChild(imprimerButton);
        }, 100);
    });
}); 