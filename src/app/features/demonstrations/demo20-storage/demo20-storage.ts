import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

export interface Preferences {
  theme: string;
  language: string;
}

@Component({
  selector: 'app-demo20-storage',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './demo20-storage.html',
  styleUrl: './demo20-storage.css',
})
export class Demo20Storage implements OnInit {

  private readonly storageService: StorageService = inject(StorageService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  preferences: WritableSignal<Preferences> = signal(this.loadLocal());
  sessionVisitCount: WritableSignal<number> = signal(0);

  preferencesForm: FormGroup = this.fb.group({
    theme: [this.preferences().theme, []],
    language: [this.preferences().language, []]
  });

  ngOnInit(): void {
    // Au démarrage du composant, on applique immédiatement le thème sauvegardé
    // afin que l'interface reflète les préférences de l'utilisateur sans attendre une action de sa part.
    document.documentElement.setAttribute('data-bs-theme', this.preferences().theme);

    // On récupère le compteur de visites depuis le sessionStorage (null si première visite),
    // on l'incrémente de 1, puis on le resauvegarde et on met à jour le signal.
    // Le sessionStorage est propre à chaque onglet/session, donc le compteur repart à 0 à chaque nouvel onglet.
    const count = (this.storageService.getSession<number>('visitCount') ?? 0) + 1;
    this.storageService.setSession('visitCount', count);
    this.sessionVisitCount.set(count);
  }

  // Persiste les valeurs actuelles du formulaire dans le localStorage.
  // Le localStorage survit aux rechargements de page, contrairement au sessionStorage.
  saveLocal() {
    this.storageService.setLocal('preferences', this.preferencesForm.value);
  }

  // Tente de lire les préférences depuis le localStorage.
  // Si aucune valeur n'est trouvée (première visite ou données supprimées),
  // on retourne des valeurs par défaut grâce à l'opérateur ?? (nullish coalescing).
  loadLocal(): Preferences {
    return this.storageService.getLocal<Preferences>('preferences') ?? { theme: 'light', language: 'fr' };
  }

  // Appelée quand l'utilisateur valide le formulaire.
  // On enchaîne les trois étapes dans l'ordre logique :
  // 1. Sauvegarder dans le localStorage pour persister entre les sessions
  // 2. Mettre à jour le signal pour que l'interface réactive soit à jour
  // 3. Appliquer le thème sur le <html> pour que Bootstrap le prenne en compte immédiatement
  apply() {
    this.saveLocal();
    this.preferences.set(this.preferencesForm.value);

    document.documentElement.setAttribute('data-bs-theme', this.preferences().theme);
  }

  // Réinitialise toutes les préférences à leurs valeurs par défaut.
  // On agit sur les 4 couches dans lesquelles les préférences sont présentes :
  // 1. Le localStorage (suppression de la clé)
  // 2. Le signal (mise à jour de la valeur réactive)
  // 3. Le formulaire (mise à jour visuelle des champs)
  // 4. Le DOM (application immédiate du thème par défaut)
  removePreferences() {
    this.storageService.removeLocal('preferences');
    const defaults: Preferences = { theme: 'light', language: 'fr' };
    this.preferences.set(defaults);
    this.preferencesForm.setValue(defaults);

    document.documentElement.setAttribute('data-bs-theme', defaults.theme);
  }

  // Réinitialise le compteur de visites en vidant entièrement le sessionStorage
  // et en remettant le signal à 0 pour mettre à jour l'affichage.
  resetVisitCount() {
    this.storageService.clearSession();
    this.sessionVisitCount.set(0);
  }
}
