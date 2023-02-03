import { Component } from '@angular/core';
import { EntrepriseService } from 'src/app/services/entreprise.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-historique-commandes',
  templateUrl: './historique-commandes.component.html',
  styleUrls: ['./historique-commandes.component.scss'],
})
export class HistoriqueCommandesComponent {
  userCords!: any;
  societyData!: any;
  private isRequestSent = false
  constructor(
    private _entrepriseService: EntrepriseService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    //récupérer les données de l'entreprise
    this._entrepriseService.getOneEntreprise(7).subscribe((data: any) => {
      this.societyData = data[0];
      console.log(this.societyData.nom_entreprise);
      // on associe l'utilisateur connecté à l'entreprise visité
      this._userService.associateUser(this.societyData.nom_entreprise, this.userCords.user_mail).subscribe((data: any) => {
          console.log(data);
        });
    });
    this.userCords = JSON.parse(localStorage.getItem('profilCords') as any);
    const userFirstName = this.userCords.user_firstname;
    const userLastName = this.userCords.user_lastname;
  };

  onValidate(): void {
    const userMail = {"user_mail" : this.userCords.user_mail}
    if (!this.isRequestSent) {
      this._entrepriseService.addClient(userMail).subscribe((response: any) => {
        console.log(response);
      });
    };
    window.location.href = "/overview/historique"
  }
}

