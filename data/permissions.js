module.exports = {

  permissions: [
    {
      name: 'Ring 1: hoogst vertrouwelijke informatie',
      roles: ['data manager','netwerkbeheerder'],
      description: 'Releasefase waar een data manager de unencrypted persoonsgegevens encrypted in de database importeert, en direct verwijdert.',
      level: 1
    },
    {
      name: 'Ring 2: hoogst begrensde informatie',
      roles: ['release manager'],
      description: 'Toegang tot productiewachtwoorden en encrypted persoonsgegevens Releasefase waar een releasemanager de productiewachtwoorden importeert, en de broncode upload. Research naar bestaande omgevingen Researchfase waar een developer onderzoek doet naar een productieomgeving met een live database en encrypted persoonsgegevens.',
      level: 2
    },
    {
      name: 'Ring 3: hoog begrensde informatie',
      roles: ['release manager'],
      description: 'Toegang tot acceptatie server wachtwoorden Releasefase waar een releasemanager de acceptatie server wachtwoorden importeert, en de broncode upload.',
      level: 3
    },
    {
      name: 'Ring 4: project begrensde informatie voor ontwikkelaars',
      roles: ['release manager'],
      description: 'Toegang tot databasestructuur, testdata en unprocessed broncode Ontwikkelfase waar developers individuele features ontwikkelen binnen een lokale ontwikkelomgeving, gevuld met de uiteindelijke databasestructuur, testdata en broncode met een testconfiguratie.',
      level: 4
    },
    {
      name: 'Ring 5: project begrensde informatie',
      roles: ['interne redacteur'],
      description: 'Toegang tot productieomgevingen zonder dat persoonsgegevens, broncode of databases te bekijken zijn.',
      level: 5
    },
    {
      name: 'ring 6: extern begrensde informatie',
      roles: ['designer', 'project manager'],
      description: 'Algemene informatie',
      level: 6
    }
  ]
}
