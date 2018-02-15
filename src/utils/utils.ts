import { urlBase } from './urlBase';
import { HttpHeaders } from '@angular/common/http';
export class Utils {
    public static headerPost = new HttpHeaders().set('Accept', 'application/json')
                                    .set('Content-Type', 'application/json');
    public static urlShowAllContacts = urlBase +  '/show_all_contacts';
    public static urlSearchById = urlBase +  '/search_by_id';
    public static urlCreateContact = urlBase +  '/create_contact';
    public static urlDeleteContact = urlBase + '/delete_contact';
    public static urlEditContact = urlBase +  '/edit_contact';
    public static urlSearchByAll = urlBase +  '/search_by_all';
}
