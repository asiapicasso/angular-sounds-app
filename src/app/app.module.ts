import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { AudioService } from './service/audio.service';


@NgModule({
    // ...
    imports: [LeafletModule],
    providers: [AudioService] //continuité du service audio dans l'app
    // ...
})
export class AppModule { }