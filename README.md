# Willkommen zu der Applikation!

Hi lieber Kunde!  Diese Datei ist für dich von dem Team **Spaten** bereitgestellt, damit du mit unserer Applikation **SpielerMinus** vertraut wirst. Hier findest du auch unseren Werdegang, Philosophie des Teams und andere wichtige Informationen. Bei jäglichen Fragen kontaktiere gerne Unseren Product Owner **Illya Benyuk** oder Seine Vertretung **Nicklas Ewes**. Sonst steht dir Unser ganzes Team zur Verfügung! 

# Files

In dem gesammten Packet bekommst du die Applikation, **Admincredentials mit One-Time Password** und diese Anleitung. Separat dazu hat jedes Mitglied seinen Bericht über die Erfahrung in dem Team und über die Arbeit nach Scrum Methode auf **HVS** hochgeladen.
## Start der Applikation

Nun zu den wichtigeren Dingen. Um die Applikation bei sich lokal zu starten braucht man:
Eine IDE, wie zum Beispiel **Intellij**
**Tutorial für installation von Intellij:** https://www.youtube.com/watch?v=yNDmGkG-3NY

Um die Nutzung der Applikation leichter zu machen, gibt es eine interne Datenbank in der Applikation namens **SQLLite**, daher braucht der Nutzer keine Datenbank oder Datenbankmanagementsystem auf dem Gerät zu haben.
**Schritte zum Start der Applikation (Backend)**
1. IDE installieren.
2. In der IDE **File>New>**
	a) Project From Version Control (beim clonen aus GitHub (empfohlen): https://github.com/twoichai/spielerminusapp.git
	**(<> Code > HTTPS > Link Kopieren)**
	b) Project From Existing Sources (bei .ZIP-Datei)
3. Maven Build
4. Start der Applikation: Dafür müsste die "Play Button" oben rechts gedrückt werden
5. Die Applikation läuft! (auf http://localhost:8081/)

**Schritte zum Start der Applikation (Frontend)**
Um weiter die Funktionalitäten auszukosten muss man zusätzlich Frontend starten.
Ähnlich wie bei Backend muss man Frontend laden. Dafür liegt eine Konfiguration bereit.
1.  Neben dem Knopf "Play", der sich zu einem Pfeil geändert sollte "SpielerminusApplication" drücken, um Dropdown Menu zu öffnen
7. Npm auswählen und "Play" drücken

Fertig!
## Applikation nutzen
Um Applikation zu nutzen soll im Browser den Link http://localhost:8081/ angeben

---
Dem Nutzer kommt dann Anmeldungsfenster entgegen.
**One Time Credentials:**

**Username:** admin1
**Password:** admin

---
~~### Vergabe von neuen Passwort
Nach der Eingabe der Credentials muss der User neuen Password vergeben und diesen noch bestätigen.~~

Dem Nutzer kommt die **Übersicht** entgegen. Dabei hat man die Möglichkeit:
1. Athletenbereichanzusehen
2. Übungskatalog anzuschauen
3. ~~Profil zu ändern~~

## Athletenbereich
Im Athletenbereich bekommt der Nutzer die Ansicht der Liste der verfügbaren Sportler.
Es ist möglich Sportler bei "+" manuel oder durch Importe von CSV Datei anzulegen (siehe **CSV-Files Importieren**).
Zusätzlich ist eine Suchfunktion implementiert und auch eine "Filtern nach" Funktion

Zusätzlich kann der Nutzer die einzelnen User anklicken und dann von diesem die Details ansehen. 
Es ist möglich dann in der Detailansicht je nach Kategorie die Sportarten sich anzeigen zu lassen, welche von dem ausgewählten Athleten belegt werden können.

Diese werden jeweils dem Athleten nach dem filtern nach seinem derzeitigen Alter, dem Geschlecht und Kategorie angezeigt.

## Übungskatalog
Übungskatalog ermöglicht es den Trainern alle Sportarten und Regel anzusehen, die derzeit in der Datenbank gespeichert sind

## CSV-Files Importieren

Die Applikation beinhaltet die Methode:
**Importen von den Nutzern durch die CSV-Datei**
Um dies zu Tun muss der Nutzer in **der Athletenübersicht** sein und auf **"+"** drücken. In dem **Dropdown Menu** erscheint dann ein **CSV-Button**, um durch CSV Datei mehrere oder einzelne Athleten zu importieren.

~~Importe von Belegten Übungen durch eine CSV-Datei~~

---

~~### CSV-Files Exportieren
Die Applikation beinhaltet die Methode:
zur Exporte von den Nutzern
Exporte der Completed exercises~~
## Was und wer ist Team Spaten?
Team Spaten ist eine dynamische Gruppe technikbegeisterter Studierender, die sich durch ihre Leidenschaft für innovative Softwarelösungen und fortschrittliche Entwicklungspraktiken auszeichnet. 

## Philosophie des Teams

Team Spaten folgt einer agilen Philosophie mit einem starken Fokus auf Scrum-Methodik, die es uns ermöglicht, effizient und reaktionsschnell zu sein. Wir schätzen offene Kommunikation und gegenseitige Wertschätzung hoch, was zu einer produktiven und positiven Arbeitsumgebung führt. Unser Ansatz kombiniert regelmäßige Sprints und Reviews, wodurch wir stetig lernen und uns verbessern. Dieses System fördert nicht nur die technische Exzellenz und die Kundenzufriedenheit, sondern stärkt auch den Zusammenhalt und das Engagement innerhalb des Teams.

## Der Weg zum Erfolg

Das Entwicklerteam Spaten hat eine Reise durchlebt, die stark an die Entwicklungskurven von Superhelden in ihren Filmen erinnert. Ihre Anfänge waren geprägt von großen Ambitionen und klaren Visionen, doch der Weg zum Erfolg war voller Herausforderungen. Sie stießen auf technische Schwierigkeiten, enge Deadlines und das Erlernen neuer Technologien, was ihre Entschlossenheit und Fähigkeiten auf die Probe stellte.

Wie Superhelden, die lernen, ihre Kräfte zu meistern, wuchs das Team mit jeder überwundenen Hürde. In kritischen Momenten, ähnlich den dramatischen Wendepunkten in Filmen, fanden sie neue Wege, ihre Probleme anzugehen und passten ihre Strategien an. Diese Phasen der Selbstreflexion und Anpassung führten zu sichtbaren Erfolgen.

Durch Resilienz und kontinuierliche Verbesserung transformierte sich Team Spaten von einem ambitionierten Studententeam zu einem echten Kraftpaket in der Entwicklerwelt. Ihre Reise verdeutlicht nicht nur ihre technische Kompetenz, sondern auch ihren starken Teamgeist und die Fähigkeit, unter Druck zu gedeihen. Heute steht Team Spaten stärker da als je zuvor, bereit, jede neue Herausforderung anzunehmen.
