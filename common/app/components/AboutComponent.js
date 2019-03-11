import { html, css } from 'lit-element';
import { PageViewElement } from './PageViewElement';

export class AboutComponent extends PageViewElement {
  static get styles() {
    return css`
      :host {
        padding-left: 2em;
        padding-right: 2em;
      }
    `;
  }

  render() {
    return html`
      <h1>About</h1>
      <p>Sfeir School PWA</p>
      <p>
        Inter quos Paulus eminebat notarius ortus in Hispania, glabro quidam sub vultu latens, odorandi vias periculorum
        occultas perquam sagax. is in Brittanniam missus ut militares quosdam perduceret ausos conspirasse Magnentio,
        cum reniti non possent, iussa licentius supergressus fluminis modo fortunis conplurium sese repentinus infudit
        et ferebatur per strages multiplices ac ruinas, vinculis membra ingenuorum adfligens et quosdam obterens
        manicis, crimina scilicet multa consarcinando a veritate longe discreta. unde admissum est facinus impium, quod
        Constanti tempus nota inusserat sempiterna.
      </p>

      <p>
        Alios autem dicere aiunt multo etiam inhumanius (quem locum breviter paulo ante perstrinxi) praesidii
        adiumentique causa, non benevolentiae neque caritatis, amicitias esse expetendas; itaque, ut quisque minimum
        firmitatis haberet minimumque virium, ita amicitias appetere maxime; ex eo fieri ut mulierculae magis
        amicitiarum praesidia quaerant quam viri et inopes quam opulenti et calamitosi quam ii qui putentur beati.
      </p>

      <p>
        Accedebant enim eius asperitati, ubi inminuta vel laesa amplitudo imperii dicebatur, et iracundae suspicionum
        quantitati proximorum cruentae blanditiae exaggerantium incidentia et dolere inpendio simulantium, si principis
        periclitetur vita, a cuius salute velut filo pendere statum orbis terrarum fictis vocibus exclamabant.
      </p>

      <p>
        Nihil morati post haec militares avidi saepe turbarum adorti sunt Montium primum, qui divertebat in proximo,
        levi corpore senem atque morbosum, et hirsutis resticulis cruribus eius innexis divaricaturn sine spiramento
        ullo ad usque praetorium traxere praefecti.
      </p>

      <p>
        Cumque pertinacius ut legum gnarus accusatorem flagitaret atque sollemnia, doctus id Caesar libertatemque
        superbiam ratus tamquam obtrectatorem audacem excarnificari praecepit, qui ita evisceratus ut cruciatibus membra
        deessent, inplorans caelo iustitiam, torvum renidens fundato pectore mansit inmobilis nec se incusare nec
        quemquam alium passus et tandem nec confessus nec confutatus cum abiecto consorte poenali est morte multatus. et
        ducebatur intrepidus temporum iniquitati insultans, imitatus Zenonem illum veterem Stoicum qui ut mentiretur
        quaedam laceratus diutius, avulsam sedibus linguam suam cum cruento sputamine in oculos interrogantis Cyprii
        regis inpegit.
      </p>
    `;
  }
}

customElements.define('app-about', AboutComponent);
