import { Subscription  } from 'aurelia-event-aggregator';
import { autoinject, singleton } from "aurelia-framework";
import { Web3Service } from "../services/Web3Service";
import { ArcService } from "../services/ArcService";
import { OrganizationService, DAO } from "../services/OrganizationService";

@singleton(false) // meaning true
@autoinject
export class OrganizationsList {

  list: HTMLElement;
  daoChangedSubscription: Subscription;
  listIsLoaded: boolean = false;

    constructor(
        private web3: Web3Service
        , private arcService: ArcService
        , private organizationService: OrganizationService
    ) {
      /** 
       * Call this before the DAOs have begun being fetched, or you'll miss some.
       * The idea here is that we fetch the DAOs visibly.
       */
      this.daoChangedSubscription = this.organizationService
        .subscribe(OrganizationService.daoAddedEvent,
            (dao) => {this.organizationArray.push(dao);} );
    }

    organizationArray: Array<any> = [];

    // async activate() {
    //   this.organizationService.allOrganizations().then((orgsList) => {

    //       this.organizationArray = orgsList;
    //       this.listIsLoaded = true;

    //     });
    // }

    // deactivate() {
    //   this.daoChangedSubscription.dispose();
    // }
    // attached() {
    //   $(this.list).find('.tooltipped').tooltip({delay: 50});
    // }
}
