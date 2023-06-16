import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "styles/mention.css";

export default function Mention() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="mention">
      <Typography variant="h4" sx={{ marginBottom: "1rem", flexShrink: 0 }}>
        Politiques et confidentialités de <b> Winepal</b>
      </Typography>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Conditions générales d'utilisation
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Ce site web est exploité par WinePal. Partout sur le site, nous
            employons les termes « nous », « notre » et « nos » en référence à
            WinePal...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            CONDITIONS D'UTILISATION <br /> <br /> ---- APERÇU <br />
            <br /> Ce site web est exploité par WinePal. Partout sur le site,
            nous employons les termes « nous », « notre » et « nos » en
            référence à WinePal. Ce site web, y compris l'ensemble des
            informations, outils et services auquel il donne accès, est offert
            par WinePal à l'utilisateur que vous êtes, à condition que vous
            acceptiez la totalité des modalités, conditions, politiques et avis
            stipulés ici. En visitant notre site et/ou en achetant quelque chose
            auprès de notre entreprise, vous prenez part à notre « Service » et
            acceptez d'être lié(e) par les modalités et conditions suivantes («
            Conditions générales », « Conditions d'utilisation »), y compris par
            les modalités, conditions et politiques mentionnées aux présentes
            et/ou accessibles en hyperlien. Les présentes Conditions
            d'utilisation s'appliquent à tous les utilisateurs du Site, y
            compris, sans s'y limiter, aux individus qui sont des visiteurs, des
            fournisseurs, des clients, des marchands et/ou des fournisseurs de
            contenu. Veuillez lire attentivement les présentes Conditions
            d'utilisation avant d'accéder à notre site web et de l'utiliser. En
            accédant à une quelconque partie du Site ou en l'utilisant, vous
            acceptez d'être lié(e) par les présentes Conditions d'utilisation.
            Si vous n'acceptez pas la totalité des modalités et conditions du
            présent accord, vous ne pourrez peut-être pas accéder au site web ou
            utiliser ses services. Si les présentes Conditions d'utilisation
            sont considérées comme une offre, leur acceptation se limite
            expressément à elles. Chacun des nouveaux outils ou fonctionnalités
            qui sont ajoutés à la présente boutique est également assujetti aux
            Conditions d'utilisation. Vous pouvez consulter la version la plus
            récente des Conditions d'utilisation à tout moment sur cette page.
            Nous nous réservons le droit de mettre à jour, modifier ou remplacer
            n'importe quelle partie des présentes Conditions d'utilisation en
            publiant lesdites mises à jour et/ou modifications sur notre site
            web. Il vous incombe de vérifier cette page de temps à autre pour
            voir si des changements y ont été apportés. En continuant à accéder
            au site web ou à l'utiliser après la publication des modifications,
            vous acceptez celles-ci. Notre boutique est hébergée sur Shopify
            Inc. Cette société nous fournit la plateforme e-commerce en ligne
            qui nous permet de vous vendre nos produits et services. <br />
            <br /> SECTION 1 – CONDITIONS D'UTILISATION DE LA BOUTIQUE EN LIGNE
            <br />
            <br />
            En acceptant les présentes Conditions d'utilisation, vous déclarez
            avoir atteint ou dépassé l'âge de la majorité dans votre région,
            province ou État et nous avoir donné l'autorisation de permettre à
            toute personne mineure à votre charge d'utiliser ce site. Vous ne
            devez en aucune façon utiliser nos produits à des fins illégales ou
            non autorisées, ni violer des lois de votre juridiction lorsque vous
            utilisez le Service (y compris, sans toutefois s'y limiter, les lois
            relatives aux droits d'auteur). Vous ne devez pas transmettre de
            vers informatique, de virus ou tout code de nature destructrice. Une
            infraction ou une violation de n'importe laquelle des Conditions
            entraînera la résiliation immédiate de vos Services. <br />
            <br /> SECTION 2 – CONDITIONS GÉNÉRALES
            <br />
            <br /> Nous nous réservons le droit de refuser de servir quelqu'un à
            tout moment et pour quelque raison que ce soit. Vous comprenez que
            votre contenu (à l'exception des informations relatives à votre
            carte de crédit) peut être transféré sans chiffrement et que cela
            comprend (a) des transmissions sur plusieurs réseaux ; et (b) des
            changements effectués dans le but de se conformer et de s'adapter
            aux exigences techniques de la connexion de réseaux ou d'appareils.
            Les informations de votre carte de crédit sont toujours chiffrées
            lors de leur transfert sur les réseaux. Vous acceptez de ne pas
            reproduire, dupliquer, copier, vendre, revendre ou exploiter toute
            partie du Service, toute utilisation du Service ou tout accès au
            Service, ou encore tout contact sur le site web à travers lequel le
            Service est fourni, sans notre autorisation écrite expresse. Les
            titres utilisés dans le présent accord sont inclus à titre indicatif
            uniquement et ne limiteront ni n'affecteront aucunement ces
            Conditions. <br />
            <br /> SECTION 3 – EXACTITUDE, EXHAUSTIVITÉ ET ACTUALITÉ DES
            INFORMATIONS
            <br />
            <br /> Nous ne saurions être tenus responsables si les informations
            proposées sur ce site sont inexactes, incomplètes ou caduques. Le
            contenu de ce site est fourni à titre d'information générale
            uniquement et ne doit pas être considéré ou utilisé comme seule base
            pour la prise de décisions sans consulter des sources d'information
            plus importantes, plus exactes, plus complètes ou plus actuelles. Si
            vous vous fiez au contenu de ce site, vous le faites à vos propres
            risques. Ce site peut contenir certaines données historiques. Par
            définition, les données historiques ne sont pas actuelles et sont
            fournies uniquement à titre de référence. Nous nous réservons le
            droit de modifier les contenus de ce site à tout moment, mais nous
            n'avons aucune obligation de mettre à jour les informations qu'il
            contient, quelles qu'elles soient. Vous reconnaissez qu'il vous
            incombe de surveiller les changements apportés à notre site.
            <br />
            <br /> SECTION 4 – MODIFICATIONS DU SERVICE ET DES PRIX
            <br />
            <br /> Les prix de nos produits sont modifiables sans préavis. Nous
            nous réservons le droit de modifier ou de mettre fin au Service (ou
            à une quelconque partie de celui-ci) à tout moment et sans préavis.
            Nous ne pourrons être tenus responsables envers vous ou tout tiers
            de tout changement de prix, ou encore de toute modification,
            suspension ou interruption du Service.
            <br />
            <br /> SECTION 5 – PRODUITS OU SERVICES (le cas échéant) <br />
            <br />
            Il est possible que certains produits ou services ne soient
            disponibles qu'en ligne à travers le site web. Il se peut que les
            quantités de ces produits ou services soient limitées et que leur
            retour ou leur échange soit strictement assujetti à notre Politique
            de retour. Nous nous sommes efforcés de présenter aussi précisément
            que possible les couleurs et images des produits figurant sur la
            boutique. Nous ne pouvons cependant pas garantir la précision
            d'affichage des couleurs sur l'écran de votre ordinateur. Nous nous
            réservons le droit, sans toutefois y être obligés, de limiter la
            vente de nos produits ou Services à n'importe quelle personne,
            région géographique ou juridiction donnée. Nous nous autorisons à
            exercer ce droit au cas par cas. Nous nous réservons le droit de
            limiter les quantités des produits ou services que nous offrons.
            Toutes les descriptions des produits et leur tarification sont
            modifiables à tout moment, sans préavis et à notre entière
            discrétion. Nous nous réservons le droit d'interrompre la vente d'un
            produit à tout moment. Toute offre de produit ou service sur ce site
            est nulle là où la loi l'interdit. Nous ne garantissons pas que la
            qualité des produits, services, informations ou autres matériels que
            vous achetez ou que vous vous procurez répondra à vos attentes ni
            que les erreurs que comporte éventuellement le Service seront
            corrigées. <br />
            <br />
            SECTION 6 – EXACTITUDE DE LA FACTURATION ET DES INFORMATIONS DE
            COMPTE
            <br />
            <br /> Nous nous réservons le droit de refuser toute commande que
            vous passez auprès de nous. Nous pouvons, à notre seule discrétion,
            limiter ou annuler les quantités achetées par personne, par foyer ou
            par commande. Ces restrictions peuvent inclure les commandes passées
            par ou sur le même compte client, la même carte de crédit et/ou des
            commandes utilisant la même adresse de facturation et/ou
            d'expédition. Si nous modifions ou annulons une commande, il se peut
            que nous tentions de vous en aviser en vous contactant au moyen de
            l'adresse e-mail et/ou de l'adresse de facturation ou du numéro de
            téléphone fournis au moment de la commande. Nous nous réservons le
            droit de limiter ou d'interdire les commandes qui, selon nous,
            semblent avoir été passées par des négociants, des revendeurs ou des
            distributeurs. Vous acceptez de fournir des informations d'achat et
            de compte actuelles, complètes et exactes pour tous les achats
            effectués dans notre boutique. Vous acceptez de mettre rapidement à
            jour votre compte et toute autre information, y compris votre
            adresse e-mail et vos numéros de cartes de crédit et leurs dates
            d'expiration, afin que nous puissions finaliser vos transactions et
            vous contacter en cas de besoin. Pour plus d'informations, veuillez
            consulter notre Politique de retour.
            <br />
            <br />
            SECTION 7 – OUTILS FACULTATIFS
            <br />
            <br /> Nous sommes susceptibles de vous fournir l'accès à des outils
            tiers que nous ne surveillons, ne contrôlons et ne gérons pas. Vous
            reconnaissez et acceptez que nous vous fournissons l'accès à ces
            outils « tels quels » et « sous réserve de disponibilité », sans
            garantie, représentation ou condition d'aucune sorte et sans la
            moindre approbation. Nous ne saurions être tenus responsables de
            quoi que ce soit à l'égard de ce qui pourrait résulter de ou être
            relié à votre utilisation des outils facultatifs tiers. Toute
            utilisation par vous des outils facultatifs proposés par le biais du
            site est entièrement à votre discrétion et à vos propres risques. En
            outre, il vous appartient de vous renseigner sur les conditions dans
            lesquelles ces outils sont fournis par le(s) fournisseur(s) tiers
            concerné(s) et accepter ces conditions. Il se peut également qu'à
            l'avenir, nous proposions de nouveaux services et/ou de nouvelles
            fonctionnalités à travers le site web (y compris le lancement de
            nouveaux outils et ressources). Ces nouveaux services et/ou
            fonctionnalités seront aussi assujettis aux présentes Conditions
            d'utilisation. <br />
            <br />
            ARTICLE 8 – LIENS DE TIERS
            <br />
            <br /> Certains contenus, produits et services accessibles via notre
            Service peuvent inclure des éléments provenant de tiers. Les liens
            de tiers sur ce site peuvent vous rediriger vers des sites web de
            tiers qui ne sont pas affiliés à nous. Nous ne sommes pas tenus
            d’examiner ou d’évaluer leur contenu ou leur exactitude, de même que
            nous ne garantissons pas et n’assumons aucune responsabilité quant
            aux contenus ou sites web, ou aux autres contenus, produits ou
            services de sources tierces. Nous ne sommes pas responsables des
            préjudices ou dommages liés à l’achat ou à l’utilisation de biens,
            services, ressources, contenus ou de toute autre transaction reliée
            à ces sites web tiers. Veuillez lire attentivement les politiques et
            pratiques de ces tiers et assurez-vous de bien les comprendre avant
            de vous engager dans une transaction. Les plaintes, réclamations,
            préoccupations ou questions concernant les produits de tiers doivent
            être adressées à ces mêmes tiers.
            <br />
            <br /> ARTICLE 9 – COMMENTAIRES, RETOURS D'EXPÉRIENCE ET AUTRES
            SOUMISSIONS
            <br />
            <br /> Si, à notre demande, vous soumettez des contenus spécifiques
            (par exemple, dans le cadre de votre participation à des concours),
            ou si, sans demande de notre part, vous envoyez des idées créatives,
            des suggestions, des propositions, des plans ou d’autres éléments,
            que ce soit en ligne, par e-mail, par courrier ou autrement
            (collectivement, « commentaires »), vous nous accordez le droit, à
            tout moment et sans restriction, de modifier, copier, publier,
            distribuer, traduire et utiliser dans quelque média que ce soit tous
            les commentaires que vous nous transmettez. Nous ne sommes pas et ne
            devrons en aucun cas être tenus (1) de maintenir la confidentialité
            des commentaires ; (2) de dédommager qui que ce soit pour tout
            commentaire fourni ; ou (3) de répondre aux commentaires. 7. Nous
            pouvons, mais nous n'en avons pas l'obligation, supprimer le contenu
            et les Comptes contenant du contenu que nous jugeons, à notre seule
            discrétion, illégal, offensant, menaçant, diffamatoire,
            pornographique, obscène ou autrement répréhensible ou qui viole la
            propriété intellectuelle d'une partie ou les présentes Conditions
            d'utilisation. Vous convenez que vos commentaires ne doivent en
            aucun cas porter atteinte aux droits de tiers, y compris aux droits
            d'auteur, aux marques de commerce, à la vie privée, à la
            personnalité ou à tout autre droit personnel ou de propriété
            intellectuelle. Vous convenez en outre que vos commentaires ne
            devront contenir aucun élément illégal, injurieux ou obscène, ni
            aucun virus informatique ou autre logiciel malveillant susceptible
            d'affecter d'une quelconque façon le fonctionnement du Service ou de
            tout site web connexe. Vous ne pouvez pas utiliser de fausse adresse
            e-mail, prétendre être quelqu’un que vous n’êtes pas, ou essayer de
            nous induire, nous ou les tiers, en erreur quant à l’origine des
            commentaires. Vous êtes entièrement responsable de tous les
            commentaires que vous émettez ainsi que de leur exactitude. Nous
            déclinons toute responsabilité à l'égard des commentaires publiés
            par vous ou un tiers.
            <br />
            <br /> ARTICLE 10 – INFORMATIONS PERSONNELLES <br />
            <br />
            La transmission de vos informations personnelles sur notre boutique
            est régie par notre Politique de confidentialité. Cliquez ici pour
            consulter notre Politique de Confidentialité. <br />
            <br />
            ARTICLE 11 – ERREURS, INEXACTITUDES ET OMISSIONS
            <br />
            <br /> Il se peut qu'il y ait parfois, sur notre site ou dans le
            Service, des informations contenant des erreurs typographiques, des
            inexactitudes ou des omissions reliées aux descriptions, aux prix,
            aux promotions, aux offres, aux frais d’expédition, aux délais
            d'acheminement et à la disponibilité des produits. Nous nous
            réservons le droit de corriger toute erreur, inexactitude ou
            omission, et de changer ou d'actualiser des informations, voire
            d’annuler des commandes si une quelconque information dans le
            Service ou sur tout site web connexe est inexacte, et ce, à tout
            moment et sans préavis (y compris après que vous ayez passé votre
            commande). Nous ne sommes pas tenus d'actualiser, de modifier ou de
            clarifier les informations indiquées dans le Service ou sur tout
            site web connexe, y compris mais sans s'y limiter, les informations
            sur les prix, sauf si la loi l'exige. Aucune date précise de mise à
            jour ou d’actualisation appliquée au Service ou à tout site web
            connexe ne saurait être définie pour indiquer que l'ensemble des
            informations offertes dans le Service ou sur tout site web connexe
            ont été modifiées ou mises à jour.
            <br />
            <br /> ARTICLE 12 – UTILISATIONS INTERDITES
            <br />
            <br /> En plus des autres interdictions énoncées dans les Conditions
            d’utilisation, il vous est interdit d’utiliser le site ou son
            contenu : (a) à des fins illégales ; (b) pour inciter des tiers à
            réaliser des actes illégaux ou à y prendre part ; (c) pour
            enfreindre toute ordonnance locale ou toute réglementation, règle ou
            loi internationale, fédérale, provinciale ou étatique ; (d) pour
            transgresser ou violer nos droits de propriété intellectuelle ou
            ceux de tiers ; (e) pour harceler, maltraiter, insulter, blesser,
            diffamer, calomnier, dénigrer, intimider ou discriminer quiconque en
            fonction du sexe, de l’orientation sexuelle, de la religion, de
            l’origine ethnique, de la race, de l’âge, de l’origine nationale ou
            d’un handicap ; (f) pour soumettre des renseignements faux ou
            trompeurs ; (g) pour mettre en ligne ou transmettre des virus ou
            tout autre type de code malveillant qui sera ou pourrait être
            utilisé en vue de compromettre la fonctionnalité ou le
            fonctionnement du Service ou de tout site web connexe, ainsi que
            d'autres sites web ou d’Internet ; (h) pour recueillir ou suivre les
            renseignements personnels d’autrui ; (i) pour spammer, hameçonner,
            détourner un domaine, extorquer des informations, parcourir,
            explorer ou balayer le web ; (j) à des fins obscènes ou immorales ;
            ou (k) pour perturber ou contourner les mesures de sécurité du
            Service ou de tout site connexe, ainsi que d'autres sites web ou
            d’Internet. Nous nous réservons le droit de mettre fin à votre
            utilisation du Service ou de tout site web connexe pour avoir
            enfreint les interdits en matière d'utilisation.
            <br />
            <br />
            ARTICLE 13 – EXCLUSION DE GARANTIES ET LIMITATION DE RESPONSABILITÉ
            <br />
            <br />
            Nous ne garantissons, certifions ou déclarons en aucun cas que votre
            utilisation de notre Service sera ininterrompue, sécurisée, sans
            délai ou sans erreur. Nous ne garantissons pas que les résultats qui
            pourraient être obtenus en utilisant le Service seront exacts ou
            fiables. Vous acceptez que, de temps à autre, nous puissions retirer
            le Service pour des périodes indéterminées ou l'annuler à tout
            moment et sans préavis. Vous convenez expressément que votre
            utilisation du Service, ou votre incapacité à utiliser celui-ci, est
            à votre seul risque. Le Service ainsi que tous les produits et
            services qui vous sont fournis par le biais de celui-ci sont (sauf
            mention expresse de notre part) fournis « tels quels » et « sous
            réserve de disponibilité » pour votre utilisation, et ce, sans
            représentation, garanties ou conditions d'aucune sorte, soit
            expresses soit implicites, y compris toutes les garanties ou
            conditions implicites de commercialisation ou de qualité marchande,
            d’adaptation à un usage particulier, de durabilité, de titre et
            d’absence de contrefaçon. WinePal, nos directeurs, responsables,
            employés, sociétés affiliées, agents, contractants, stagiaires,
            fournisseurs, prestataires de services et concédants ne peuvent en
            aucun cas être tenus responsables de toute blessure, perte,
            réclamation, ou de quelconques dommages directs, indirects,
            accessoires, punitifs, spéciaux ou consécutifs, y compris mais sans
            s'y limiter, de la perte de profits, revenus, économies ou données,
            de coûts de remplacement ou autres dommages similaires, qu’ils
            soient contractuels, délictuels (même en cas de négligence), de
            responsabilité stricte ou autre, résultant de votre utilisation du
            Service ou de tout service ou produit recourant à celui-ci, ou de
            toute autre réclamation liée de quelque manière que ce soit à votre
            utilisation du Service ou de tout produit, y compris mais sans s'y
            limiter, à des erreurs ou omissions dans un contenu, ou à de
            quelconques pertes ou dommages découlant de l’utilisation du Service
            ou d'un contenu (ou produit) publié, transmis ou rendu accessible
            par le biais du Service, et ce, même si vous avez été averti(e) de
            la possibilité qu’ils surviennent. Du fait que certains États ou
            juridictions ne permettent pas d’exclure ou de limiter la
            responsabilité quant aux dommages consécutifs ou accessoires, notre
            responsabilité dans ces États ou juridictions sera limitée dans la
            mesure maximale permise par la loi.
            <br />
            <br /> ARTICLE 14 – INDEMNISATION
            <br />
            <br /> Vous acceptez d’indemniser, de défendre et de tenir WinePal
            et notre société mère, nos filiales, sociétés affiliées,
            partenaires, responsables, directeurs, agents, contractants,
            concédants, prestataires de services, sous-traitants, fournisseurs,
            stagiaires et employés, quittes de toute réclamation ou demande, y
            compris d'honoraires raisonnables d’avocat, émise par un quelconque
            tiers à cause de ou consécutivement à votre violation des présentes
            Conditions d’utilisation ou des documents auxquels elles font
            référence, ou à votre violation de quelconques lois ou droits d’un
            tiers.
            <br />
            <br /> ARTICLE 15 – DISSOCIABILITÉ <br />
            <br />
            Dans le cas où une quelconque disposition des présentes Conditions
            d’utilisation est jugée illégale, nulle ou inapplicable, cette
            disposition sera néanmoins applicable dans la pleine mesure permise
            par la loi, et la partie non applicable sera considérée comme étant
            dissociée de ces Conditions d’utilisation, sans que ce jugement
            n'affecte la validité et l’applicabilité des autres dispositions.
            <br />
            <br /> ARTICLE 16 – RÉSILIATION <br />
            <br />
            Les obligations et responsabilités engagées par les parties avant la
            date de résiliation resteront en vigueur après la résiliation de cet
            accord, et ce, à toutes fins. Les présentes Conditions d’utilisation
            resteront en vigueur, à moins et jusqu’à ce qu’elles soient
            résiliées par vous ou par nous. Vous pouvez résilier ces Conditions
            d’utilisation à tout moment en nous avisant que vous ne souhaitez
            plus utiliser nos Services, ou lorsque vous cessez d’utiliser notre
            site. Si nous jugeons ou suspectons, à notre seule discrétion, que
            vous ne respectez pas ou que vous n'avez pas respecté une quelconque
            modalité ou disposition des présentes Conditions d’utilisation, nous
            pouvons également résilier cet accord à tout moment et sans préavis.
            Vous demeurerez alors responsable de toutes les sommes redevables
            jusqu’à la date de résiliation (incluse), en conséquence de quoi
            nous pouvons vous refuser l’accès à nos Services (ou à une partie de
            ceux-ci). <br />
            <br />
            ARTICLE 17 – INTÉGRALITÉ DE L’ACCORD
            <br />
            <br /> Tout manquement de notre part à l’exercice ou à l’application
            d'un droit ou d'une disposition des présentes Conditions
            d’utilisation ne constitue pas une renonciation à ce droit ou à
            cette disposition. Les présentes Conditions d’utilisation ou toute
            autre politique ou règle d’exploitation que nous publions sur ce
            site ou qui concernent le Service constituent l’intégralité de
            l’entente et de l’accord entre vous et nous, et régissent votre
            utilisation du Service. Elles remplacent l'ensemble des accords,
            communications et propositions antérieurs et actuels, oraux ou
            écrits, entre vous et nous (y compris, mais sans s'y limiter, toute
            version antérieure des Conditions d’utilisation). Toute ambiguïté
            quant à l’interprétation de ces Conditions d’utilisation ne doit pas
            être interprétée en défaveur de la partie rédactrice.
            <br />
            <br /> ARTICLE 18 – LOI APPLICABLE <br />
            <br />
            Les présentes Conditions d’utilisation, ainsi que tout accord
            distinct par lequel nous vous fournissons les Services sont régis et
            interprétés en vertu des lois de 68 rue de Peuille,
            CHÂTILLON-COLIGNY, 45230, France. <br />
            <br />
            ARTICLE 19 – MODIFICATIONS APPORTÉES AUX CONDITIONS D’UTILISATION
            <br />
            <br />
            Vous pouvez consulter la version la plus récente des Conditions
            d’utilisation à tout moment sur cette page. Nous nous réservons le
            droit, à notre seule discrétion, de mettre à jour, modifier ou
            remplacer toute partie des présentes Conditions d'utilisation en
            publiant lesdites mises à jour et/ou modifications sur notre site
            web. Il vous incombe de vérifier notre site web de temps à autre
            pour voir si des changements y ont été apportés. En continuant à
            accéder à notre site web et au Service ou à les utiliser après la
            publication de modifications apportées aux présentes Conditions
            d'utilisation, vous acceptez celles-ci.
            <br />
            <br />
            ARTICLE 20 – COORDONNÉES
            <br />
            <br /> Les questions relatives aux Conditions d’utilisation doivent
            nous être envoyées à winepal.entreprise@gmail.com.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Charte sur le respect de la vie privée
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            La présente charte sur le respect de la vie privée (la « Charte ») a
            pour objectif de formaliser notre engagement quant au respect de la
            vie privée des utilisateurs du site internet www.winepal.fr exploité
            par la société WinePal...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            La présente charte sur le respect de la vie privée (la « Charte ») a
            pour objectif de formaliser notre engagement quant au respect de la
            vie privée des utilisateurs du site internet www.winepal.fr exploité
            par la société WinePal. <br />
            La Charte et les Conditions Générales d'Utilisation forment un
            ensemble contractuel. Tous les termes en majuscules non-définis dans
            la présente Charte sont définis dans les Conditions Générales
            d’Utilisation. <br />
            Dans le cadre de la mise à disposition de notre Site, nous traitons
            vos données à caractère personnel dans le respect du Règlement
            Général sur la Protection des Données 2016/679 du 27 avril 2016 («
            RGPD ») et dans les conditions exposées ci-après. <br />
            Une donnée à caractère personnel désigne toute information se
            rapportant à une personne physique identifiée ou identifiable. Nous
            collectons et traitons des données à caractère personnel dans le
            cadre de la fourniture de nos Services ou de la communication à
            propos de ces Services exclusivement, en stricte conformité avec le
            RGPD. <br />
            Nous collectons uniquement des données à caractère personnel
            adéquates, pertinentes et limitées à ce qui est nécessaire au regard
            des finalités pour lesquelles elles sont traitées. Ainsi, il ne vous
            sera jamais demandé de renseigner des données à caractère personnel
            considérées comme « sensibles », telles que vos origines raciales ou
            ethniques, vos opinions politiques, philosophiques ou religieuses.
            En vous enregistrant sur le Site, vous nous autorisez à traiter vos
            données à caractère personnel conformément à la Charte. Si vous
            refusez les termes de cette Charte, veuillez-vous abstenir
            d’utiliser le Site ainsi que les Services. <br />
            <br />
            1. Responsable du traitement
            <br />
            <br />
            WinePal, micro-entreprise immatriculée au RCS de Orléans sous le
            numéro 919 145 664 et dont le siège social est situé 68, rue de
            Peuille, 45230 CHÂTILLON-COLIGNY est le responsable du traitement
            des données recueillies sur le Site. <br />
            <br />
            2. Dans quels cas collectons-nous vos données à caractère personnel
            et quelles données sont collectées ? <br />
            <br />
            2.1. Dans quels cas collectons-nous vos données à caractère
            personnel ? <br />
            <br />
            Nous sommes susceptibles de recueillir et de conserver vos données
            les données à caractère personnel que vous nous transmettez,
            notamment lorsque vous: <br />
            ● répondez à des questions sur notre site ; <br />
            ● créez un compte ; <br />
            ● vous inscrivez à notre newsletter ou téléchargez un contenu (tel
            qu’un guide, une checklist ou un modèle de document) ; <br />
            ● transmettez de telles informations à notre service client par
            email, chat ou téléphone ; <br />
            ● réalisez un paiement. <br />
            Vous pouvez toujours choisir de ne pas nous transmettre ces
            informations. Néanmoins, elles sont dans certains cas indispensables
            pour la bonne exécution d’un Service. <br />
            Nous utilisons vos données à caractère personnel pour permettre la
            mise en œuvre et la gestion des Services du Site et répondre à vos
            demandes spécifiques. Nous utilisons également vos données à
            caractère personnel dans le but d'exploiter et d'améliorer nos
            Services, notre Site et notre démarche. Ces informations sont
            utilisées uniquement par nos soins et nous permettent de mieux
            adapter nos Services à vos attentes. En particulier, lors de votre
            utilisation des questionnaires, nous nous réservons le droit de
            collecter, recueillir et enregistrer certaines de vos données, par
            exemple vos temps de réponses, vos choix par défaut, etc. En ce qui
            concerne les Avocats, nous utilisons des données à caractère
            personnel exclusivement pour la création des profils individuels
            publiés sur le Site et pour le service de Mise en relation. <br />
            Si vous avez décidé de recevoir des courriels et mini messages de
            notre part lors de la création de votre Compte, vous recevrez alors
            des messages électroniques et alphanumériques portant sur nos
            produits et promotions. Nous utiliserons alors les données à
            caractère personnel que vous avez fournies lors de votre
            enregistrement. Vous pouvez vous désabonner de ces envois à tout
            moment. <br />
            <br />
            2.2 Quelles sont les données personnelles collectées ? <br />
            <br />
            2.2.1 Création d’un Compte ou d'un profil d'Avocat
            <br />
            L'accès à certains de nos Services nécessite la création préalable
            d’un Compte. Conformément aux Conditions Générales d’Utilisation, il
            vous sera demandé de renseigner un certain nombre de données à
            caractère personnel lors de la création de votre Compte, notamment
            vos noms et prénoms, votre adresse postale, votre adresse e-mail et
            votre numéro de téléphone. Lors de la création d'un profil
            personnalisé sur le Site, chaque Avocat communique son nom, prénom,
            adresse postale, adresse email et numéro de téléphone. <br />
            <br />
            2.2.2 Création de Documents et accomplissement de Formalités
            <br />
            <br />
            Dans le cadre de la création de Documents (et l’accomplissement
            éventuel de Formalités), il vous sera demandé de compléter un
            questionnaire dans le cadre duquel des données à caractère personnel
            pourront être collectées, telles que notamment : <br />
            ● votre date et lieu de naissance
            <br />
            ● l’identité de votre conjoint
            <br />
            ● votre régime matrimonial
            <br />
            ● l’identité de vos parents
            <br />
            Dans le cadre de la génération de Document ou de l’accomplissement
            de formalités, nous pouvons également être amenés à vous demander
            des informations concernant des personnes morales (société ou
            association) telles que :
            <br />● nom, prénom, adresse, adresse email et numéro de téléphone
            du représentant légal de la personne morale et des associés ; <br />
            ● dénomination sociale
            <br />
            ● adresse du siège social
            <br />
            <br />
            2.2.3 Paiement
            <br />
            <br />
            Certains Services disponibles sur le Site sont payants. A cette fin,
            vous acceptez que nous puissions avoir recours à des prestataires de
            services de paiement qui peuvent collecter vos données à caractère
            personnel dans le but de permettre le bon fonctionnement des
            services de traitement des paiements par carte de crédit et, le cas
            échéant, de livraison de produits. Pour régler votre achat, vous
            devez fournir vos coordonnées de facturation ainsi que vos
            coordonnées de paiement, c'est-à-dire : <br />
            ● le numéro de votre carte de paiement
            <br />
            ● le nom du titulaire de la carte
            <br />
            ● la date de validité et les codes de sécurité
            <br />
            Yolaw utilise le service de paiement sécurisé fourni par Stripe,
            Inc. : les données confidentielles (le numéro de carte bancaire à 16
            chiffres, la date d'expiration et le code CVX) sont donc directement
            transmises cryptées sur le serveur de Stripe, Inc. et Yolaw n’a pas
            accès à ces données. <br />
            Il peut également vous être demandé de fournir le nom de votre
            opérateur télécom, le modèle de votre téléphone portable et un
            numéro de portable valide afin de pouvoir fournir les instructions
            d’achat directement à travers votre téléphone mobile. Nous
            conservons les détails de vos paiements, ainsi que les détails des
            achats que vous effectuez. Le détail des transactions est conservé
            soit chez Yolaw soit chez le prestataire externe. Cette conservation
            est effectuée à des fins internes, notamment pour la comptabilité,
            la conformité et à des fins juridiques, conformément à la présente
            Charte. <br />
            <br />
            2.2.4 Enregistrement des appels
            <br />
            <br />
            Dans une démarche de contrôle qualité, vos échanges téléphoniques
            avec nos services sont susceptibles d'être enregistrés. Les
            enregistrements d'appels sont conservés pour une période de 6 mois.
            A l’issue de cette période, ils sont ensuite effacés. Toute donnée à
            caractère personnel obtenue de vous pendant cet appel sera traitée
            conformément aux dispositions de la présente Charte. <br />
            <br />
            2.2.5 Autres communications
            <br />
            <br />
            Lors de la création de votre Compte, vous pouvez donner votre
            consentement préalable à la réception de nos lettres d’informations
            concernant de nouveaux produits, services et promotions, dans le
            cadre des Services. <br />
            En tout état de cause, vous disposez du droit de retirer votre
            consentement à la réception de telles lettres d’information à tout
            moment et sans frais dans les conditions prévues au paragraphe 7 de
            la Charte. <br />
            <br />
            2.2.6 Contacts
            <br />
            <br />
            Afin de donner suite aux demandes que vous pourriez effectuer auprès
            de notre Service Client, de confirmer les informations et toutes les
            transactions sur votre Compte et vous donner des informations
            concernant les Services (par exemple, si vous perdez votre mot de
            passe ou si des changements sont effectués dans les Conditions
            d'utilisation), nous utiliserons vos nom, prénom et adresse email.{" "}
            <br />
            <br />
            3. Comment protégeons-nous vos données à caractère personnel ?{" "}
            <br />
            <br />
            Nous avons mis en place des mesures de sécurité techniques et
            organisationnelles en vue de garantir la sécurité, l’intégrité et la
            confidentialité de toutes vos données à caractère personnel, afin
            d’empêcher que celles-ci soient déformées, endommagées ou que des
            tiers non autorisés y aient accès. Nous assurons un niveau de
            sécurité approprié, compte tenu de l'état des connaissances, des
            coûts de mise en œuvre et de la nature, de la portée, du contexte et
            des finalités du traitement ainsi que des risques et de leur
            probabilité. <br />
            Toutefois, il est précisé qu’aucune mesure de sécurité n’étant
            infaillible, Yolaw n’est pas en mesure de garantir une sécurité
            absolue à vos données à caractère personnel. <br />
            Par ailleurs, il vous incombe d'assurer la confidentialité du mot de
            passe vous permettant d’accéder à votre Compte. Ne communiquez cette
            information à personne. Si vous partagez votre ordinateur, n'oubliez
            pas de vous déconnecter avant de quitter le Site. <br />
            <br />
            4. Dans quels cas partageons-nous vos données à caractère personnel
            ? <br />
            <br />
            4.1 Partage de vos données à caractère personnel avec des sociétés
            tierces
            <br />
            <br />
            Lors de votre navigation sur le Site, vos données à caractère
            personnel peuvent être transmises à des prestataires extérieurs. Ces
            tiers assurent un service pour notre compte et en notre nom dans le
            but de permettre le bon fonctionnement des paiements par carte de
            crédit et autres Services. Les données à caractère personnel sont
            susceptibles d’être transférées vers des pays situés hors de l’Union
            Européenne (tels que les Etats-Unis, le Maroc et Madagascar) dans le
            but de traiter vos demandes, de saisir les Formalités et d’héberger
            et sécuriser les données à caractère personnel. Conformément au
            RGPD, tous les transferts de données à caractère personnel vers un
            pays situé hors de l’Union Européenne et/ou n’offrant pas un niveau
            de protection considéré comme suffisant par la Commission européenne
            ont fait l’objet de conventions de flux transfrontière conformes aux
            clauses contractuelles types édictées par la Commission européenne
            et déclarées à la CNIL. Sauf dans le cas où un tiers vous demande
            d’accepter une charte de confidentialité et des conditions
            d’utilisations qui lui sont propres, les sociétés tierces ayant reçu
            communication de vos données à caractère personnel se sont engagées
            à traiter vos données à caractère personnel uniquement pour la mise
            en œuvre des Services. Nous ne partagerons jamais, sans avoir obtenu
            votre consentement préalable, vos données à caractère personnel avec
            des sociétés tierces à des fins marketings et/ou commerciales.{" "}
            <br />
            <br />
            4.2 Partage avec les autorités
            <br />
            <br />
            Nous pouvons être amenés à divulguer vos données à caractère
            personnel aux autorités administrative ou judiciaire lorsque leur
            divulgation est nécessaire à l'identification, l'interpellation ou
            la poursuite en justice de tout individu susceptible de porter
            préjudice à nos droits, de tout autre utilisateur ou d’un tiers.
            Nous pouvons enfin être légalement tenu de divulguer vos données à
            caractère personnel et ne pouvons dans ce cas nous y opposer. <br />
            <br />
            5. Combien de temps conservons-nous vos données à caractère
            personnel ? <br />
            <br />
            Nous ne conserverons vos données à caractère personnel que le temps
            de votre inscription sur le Site afin d'assurer votre identification
            lors de votre connexion à votre Compte et de permettre la fourniture
            des Services. Ainsi, si vous procédez à votre désinscription du
            Site, vos données à caractère personnel seront effacées et
            uniquement conservées sous forme d’archive aux fins d’établissement
            de la preuve d’un droit ou d’un contrat. En tout état de cause, nous
            conserverons vos données à caractère personnel pendant une durée
            n'excédant pas celle nécessaire au regard des finalités pour
            lesquelles elles sont traitées conformément aux utilisations
            exposées dans la présente Charte et dans le respect des lois et
            règlements. <br />
            <br />
            6. Cookies : comment les utilisons-nous ? <br />
            <br />
            6.1 Qu’est ce qu’un cookie ? <br />
            <br />
            Un cookie est un fichier texte susceptible d’être déposé dans un
            terminal lors de la consultation d’un service en ligne avec un
            logiciel de navigation. Un fichier cookie permet notamment à son
            émetteur, pendant sa durée de validité, de reconnaître le terminal
            concerné à chaque fois que ce terminal accède à un contenu numérique
            comportant des cookies du même émetteur. En tout état de cause, les
            cookies déposés sur votre terminal de navigation avec votre accord
            sont détruits 13 mois après leur dépôt sur votre terminal. <br />
            <br />
            6.2 A quoi servent les cookies émis sur notre Site ? <br />
            Les cookies que nous émettons nous permettent : <br />
            ● d'établir des statistiques et volumes de fréquentation et
            d'utilisation des diverses éléments composant notre Site (rubriques
            et contenus visités, parcours), nous permettant d'améliorer
            l'intérêt et l'ergonomie de nos services ; <br />● d'adapter la
            présentation de notre Site aux préférences d'affichage de votre
            terminal (langue utilisée, résolution d'affichage, système
            d'exploitation utilisé, etc) lors de vos visites sur notre Site,
            selon les matériels et les logiciels de visualisation ou de lecture
            que votre terminal comporte ;<br /> ● de mémoriser des informations
            relatives à un formulaire que vous avez rempli sur notre Site
            (inscription ou accès à votre compte) ou à des produits, services ou
            informations que vous avez choisis sur notre Site (service souscrit,
            contenu d'un panier de commande, etc.) ; <br />
            ● de vous permettre d'accéder à des espaces réservés et personnels
            de notre Site, tels que votre compte, grâce à des identifiants ou
            des données que vous nous avez éventuellement antérieurement confiés
            et de mettre en œuvre des mesures de sécurité, par exemple lorsqu’il
            vous est demandé de vous connecter à nouveau à un contenu ou à un
            service après une certain laps de temps. <br />
            <br />
            Lors de votre navigation sur le Site, des cookies des réseaux
            sociaux peuvent être générés notamment par l’intermédiaire des
            boutons de partage qui collectent des données à caractère personnel.
            Lors de votre première visite sur le Site, un bandeau cookies
            apparaîtra en page d’accueil. Un lien cliquable permet d’en savoir
            plus sur la finalité et le fonctionnement des cookies et renvoie
            vers la présente Charte. La poursuite de la navigation sur une autre
            page du site ou la sélection d’un élément du Site (notamment :
            image, texte, lien, etc.) matérialise votre acceptation au dépôt des
            cookies visés sur votre ordinateur. <br />
            <br />
            6.3 Comment pouvez-vous contrôler les cookies utilisés ? <br />
            <br />
            Nous utilisons un outil de gestion des cookies qui vous permet de
            consulter et de désactiver l’utilisation des cookies. Par ailleurs,
            vous pouvez configurer votre logiciel de navigation de manière à ce
            que des cookies soient enregistrés dans votre terminal ou, au
            contraire, qu'ils soient rejetés (soit systématiquement, soit selon
            leur émetteur). Vous pouvez également configurer votre logiciel de
            navigation de manière à ce que l'acceptation ou le refus des cookies
            vous soient proposés ponctuellement, avant qu'un cookie puisse être
            enregistré dans votre terminal. Attention : tout paramétrage est
            susceptible de modifier votre navigation sur Internet et vos
            conditions d'accès à certains services nécessitant l'utilisation de
            cookies. Nous déclinons toute responsabilité s’agissant des
            conséquences liées au fonctionnement dégradé de nos services
            résultant de l'impossibilité d'enregistrer ou de consulter les
            cookies nécessaires à leur fonctionnement et que vous auriez refusés
            ou supprimés. Tel serait le cas si vous tentiez d'accéder à nos
            contenus ou services qui nécessitent de vous identifier. Tel serait
            également le cas lorsque nous (ou nos prestataires) ne pourrions pas
            reconnaître, à des fins de compatibilité technique, le type de
            navigateur utilisé par votre terminal, ses paramètres de langue et
            d'affichage ou le pays depuis lequel votre terminal semble connecté
            à Internet. <br />
            <br />
            6.4 Comment configurer votre logiciel de navigation ? <br />
            <br />
            Pour la gestion des cookies et de vos choix, la configuration de
            chaque navigateur est différente. Elle est décrite dans le menu
            d'aide de votre navigateur, qui vous permettra de savoir de quelle
            manière modifier vos souhaits en matière de cookies. Vous trouverez
            ci-dessous des informations concernant les principaux navigateurs.
            Internet Explorer / Edge Dans Internet Explorer, cliquez sur le
            bouton Outils, puis sur Options Internet. Sous l'onglet Général,
            sous Historique de navigation, cliquez sur Paramètres. Cliquez sur
            le bouton Afficher les fichiers. Firefox Allez dans l'onglet Outils
            du navigateur puis sélectionnez le menu Options Dans la fenêtre qui
            s'affiche, choisissez Vie privée et cliquez sur Affichez les cookies
            Safari Accédez aux Paramètres via le menu du navigateur (Safari{" "}
            {">"}
            Préférences). Cliquez sur Confidentialité. Google Chrome Accédez aux
            Paramètres via le bouton à droite de la barre d’URL ou via le menu
            du navigateur (Chrome {">"} Préférences). Sélectionnez Paramètres
            Avancées. Cliquez sur Paramètres du contenu puis sur Cookies. Pour
            obtenir plus d’information sur les cookies, vous pouvez consulter le
            site internet de la CNIL. <br />
            <br />
            7. Quels sont vos droits ? <br />
            <br />
            Vous êtes seul à nous avoir communiqué les données en notre
            possession, par l’intermédiaire du Site. Vous disposez de droits sur
            vos données à caractère personnel. Conformément à la réglementation
            en matière de protection des données à caractère personnel,
            notamment les articles 15 à 22 du RGPD, et après avoir justifié de
            votre identité, vous avez le droit de nous demander l'accès aux
            données à caractère personnel vous concernant, la rectification ou
            l'effacement de celles-ci. En outre, dans les limites posées par la
            loi, vous disposez également du droit de vous opposer au traitement,
            de le limiter, de décider du sort de vos données, de retirer votre
            consentement à tout moment et du droit à la portabilité des données
            à caractère personnel fournies. Vous pouvez contactez nos Services
            afin d’exercer vos droits à l’adresse électronique suivante :
            winepal.entreprise@gmail.com ou à l’adresse postale suivante : 68
            rue de Peuille, 45230 CHÂTILLON-COLIGNY, en joignant à votre demande
            une copie d’un titre d’identité. Par ailleurs, vous pouvez à tout
            moment vous désabonner de notre newsletter en cliquant sur le lien
            qui permet le désabonnement en bas de chaque email. Vous pouvez
            également vous désabonner en envoyant un message à l’adresse
            suivante : winepal.entreprise@gmail.com. <br />
            <br />
            8. Pouvons-nous modifier la Charte ? <br />
            <br />
            Nous nous réservons le droit de modifier la Charte à tout moment. Il
            est vous est donc recommandé de la consulter régulièrement. En cas
            de modification, nous publierons ces changements sur cette page et
            aux endroits que nous jugerons appropriés en fonction de l’objet et
            de l’importance des changements apportés. Votre utilisation du Site
            après toute modification signifie que vous acceptez ces
            modifications. Si vous n'acceptez pas certaines modifications
            substantielles apportées à la présente Charte, vous devez arrêter
            d'utiliser le Site. <br />
            <br />
            9. Délégué à la Protection des Données et contact
            <br />
            <br />
            WinePal n’a pas désigné un Délégué à la Protection des Données (DPO)
            auprès de la CNIL Pour toute question concernant vos données à
            caractère personnel ou si vous souhaitez supprimer votre Compte,
            merci de nous contacter à l’adresse suivante : WinePal, 68 rue de
            Peuille, 45230 CHÂTILLON-COLIGNY (en indiquant "Vie Privée -
            Protection des Données"), ou par email à
            winepal.entreprise@gmail.com. <br />
            <br />
            10. La Commission Nationale de l'Informatique et des Libertés
            ("CNIL")
            <br />
            <br />
            WinePal a procédé aux formalités préalables imposées par la loi
            Informatique et Libertés auprès de la CNIL. La collecte et le
            traitement informatique des données nominatives a fait l'objet d'une
            déclaration simplifiée. WinePal vous rappelle que vous pouvez
            contacter la CNIL directement sur le site internet de la CNIL ou par
            courrier à l’adresse suivante : Commission Nationale de
            l'Informatique et des Libertés (CNIL), 3 Place de Fontenoy - TSA
            80715, 75334 PARIS CEDEX 07.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Mentions légales
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
            pour la confiance en l'économie numérique, il est précisé aux
            utilisateurs du site WinePal l'identité des différents intervenants
            dans le cadre de sa réalisation et de son suivi...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            MENTIONS LÉGALES
            <br />
            <br />
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
            pour la confiance en l'économie numérique, il est précisé aux
            utilisateurs du site WinePal l'identité des différents intervenants
            dans le cadre de sa réalisation et de son suivi.
            <br />
            <br />
            Edition du site
            <br />
            <br />
            Le présent site, accessible à l’URL www.winepal.fr (le « Site »),
            est édité par :
            <br />
            <br />
            Vincent DUBOIS, résidant 68 rue de Peuille 45230 CHÂTILLON-COLIGNY,
            de nationalité Française (France), né(e) le 22/05/1997, inscrite au
            R.C.S. de ORLEANS sous le numéro 919 145 664 R.C.S Orléans,
            <br />
            <br />
            Hébergement
            <br />
            <br />
            Le Site est hébergé par la société OVH SAS, situé 2 rue Kellermann -
            BP 80157 - 59053 Roubaix Cedex 1, (contact téléphonique ou email :
            1007).
            <br />
            <br />
            Directeur de publication
            <br />
            <br />
            Le Directeur de la publication du Site est Vincent DUBOIS.
            <br />
            <br />
            Nous contacter
            <br />
            <br />
            Par téléphone : +33659920202 Par email :
            winepal.entreprise@gmail.com Par courrier : 68 rue de Peuille 45230
            CHÂTILLON-COLIGNY
            <br />
            <br />
            Données personnelles
            <br />
            <br />
            Le traitement de vos données à caractère personnel est régi par
            notre Charte du respect de la vie privée, disponible depuis la
            section "Charte de Protection des Données Personnelles",
            conformément au Règlement Général sur la Protection des Données
            2016/679 du 27 avril 2016 («RGPD»). Génération des mentions légales
            par Legalstart.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Politique et confidentialité
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            La présente Politique de confidentialité décrit la façon dont vos
            informations personnelles sont recueillies, utilisées et partagées
            lorsque vous vous rendez sur winepal.fr (le « Site ») ou que vous y
            effectuez un achat...
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Politique de confidentialité de WinePal <br />
            <br />
            La présente Politique de confidentialité décrit la façon dont vos
            informations personnelles sont recueillies, utilisées et partagées
            lorsque vous vous rendez sur winepal.fr (le « Site ») ou que vous y
            effectuez un achat. <br />
            <br />
            INFORMATIONS PERSONNELLES RECUEILLIES
            <br />
            <br />
            Lorsque vous vous rendez sur le Site, nous recueillons
            automatiquement certaines informations concernant votre appareil,
            notamment des informations sur votre navigateur web, votre adresse
            IP, votre fuseau horaire et certains des cookies qui sont installés
            sur votre appareil. En outre, lorsque vous parcourez le Site, nous
            recueillons des informations sur les pages web ou produits
            individuels que vous consultez, les sites web ou les termes de
            recherche qui vous ont permis d'arriver sur le Site, ainsi que des
            informations sur la manière dont vous interagissez avec le Site.
            Nous désignons ces informations collectées automatiquement sous
            l'appellation « Informations sur l'appareil ».
            <br />
            <br />
            Nous recueillons les Informations sur l'appareil à l'aide des
            technologies suivantes :
            <br />
            <br />
            FICHIERS TÉMOINS (COOKIES)
            <br />
            <br />
            Voici une liste de fichiers témoins que nous utilisons. Nous les
            avons énumérés ici pour que vous ayez la possibilité de choisir si
            vous souhaitez les autoriser ou non.
            <br />
            <br />
            _session_id, identificateur unique de session, permet à Shopify de
            stocker les informations relatives à votre session (référent, page
            de renvoi, etc.).
            <br />
            <br />
            _shopify_visit, aucune donnée retenue, persiste pendant 30 minutes
            depuis la dernière visite. Utilisé par le système interne de suivi
            des statistiques du fournisseur de notre site web pour enregistrer
            le nombre de visites.
            <br />
            <br />
            _shopify_uniq, aucune donnée retenue, expire à minuit (selon
            l’emplacement du visiteur) le jour suivant. Calcule le nombre de
            visites d’une boutique par client unique.
            <br />
            <br />
            cart, identificateur unique, persiste pendant 2 semaines, stocke
            l’information relative à votre panier d’achat.
            <br />
            <br />
            _secure_session_id, identificateur unique de session
            <br />
            <br />
            storefront_digest, identificateur unique, indéfini si la boutique
            possède un mot de passe, il est utilisé pour savoir si le visiteur
            actuel a accès. <br />
            - Les « fichiers journaux » suivent l'activité du Site et
            recueillent des données telles que votre adresse IP, le type de
            navigateur que vous utilisez, votre fournisseur d'accès Internet,
            vos pages référentes et de sortie, et vos données d'horodatage (date
            et heure). - Les « pixels invisibles », les « balises » et les «
            pixels » sont des fichiers électroniques qui enregistrent des
            informations sur la façon dont vous parcourez le Site. [[INSÉRER LES
            DESCRIPTIONS DES AUTRES TYPES DE TECHNOLOGIES DE SUIVI QUE VOUS
            UTILISEZ]] <br />
            <br />
            Par ailleurs, lorsque vous effectuez ou tentez d'effectuer un achat
            par le biais du Site, nous recueillons certaines informations vous
            concernant, notamment votre nom, votre adresse de facturation, votre
            adresse d'expédition, vos informations de paiement (y compris vos
            numéros de cartes de crédit [[INSÉRER LES AUTRES MOYENS DE PAIEMENT
            ACCEPTÉS, LE CAS ÉCHÉANT]], votre adresse e-mail et votre numéro de
            téléphone. Ces informations collectées automatiquement sont
            désignées par l’appellation « Informations sur la commande ». <br />
            <br />
            [[INSÉRER TOUTES LES AUTRES INFORMATIONS QUE VOUS RECUEILLEZ, LE CAS
            ÉCHÉANT : DONNÉES HORS LIGNE, DONNÉES/LISTES ACHETÉES À DES FINS DE
            MARKETING]] <br />
            <br />
            Lorsque nous utilisons l'expression « Informations personnelles »
            dans la présente Politique de confidentialité, nous faisons allusion
            à la fois aux Informations sur l'appareil et aux Informations sur la
            commande. <br />
            <br />
            COMMENT UTILISONS-NOUS VOS INFORMATIONS PERSONNELLES ?
            <br />
            <br />
            En règle générale, nous utilisons les Informations sur la commande
            que nous recueillons pour traiter toute commande passée par le biais
            du Site (y compris pour traiter vos informations de paiement,
            organiser l'expédition de votre commande et vous fournir des
            factures et/ou des confirmations de commande). En outre, nous
            utilisons ces Informations sur la commande pour : <br />
            communiquer avec vous ; évaluer les fraudes ou risques potentiels ;{" "}
            <br />
            et lorsque cela correspond aux préférences que vous nous avez
            communiquées, vous fournir des informations ou des publicités
            concernant nos produits ou services. <br />
            <br />
            [[INSÉRER LES AUTRES UTILISATIONS QUI SONT FAITES DES INFORMATIONS
            SUR LA COMMANDE]] <br />
            <br />
            Nous utilisons les Informations sur l'appareil (en particulier votre
            adresse IP) que nous recueillons pour évaluer les fraudes ou risques
            potentiels et, de manière plus générale, pour améliorer et optimiser
            notre Site (par exemple, en générant des analyses sur la façon dont
            nos clients parcourent et interagissent avec le Site, et pour
            évaluer la réussite de nos campagnes de publicité et de marketing).{" "}
            <br />
            <br />
            [[INSÉRER LES AUTRES UTILISATIONS QUI SONT FAITES DES INFORMATIONS
            SUR L'APPAREIL, NOTAMMENT EN MATIÈRE DE PUBLICITÉ ET DE RECIBLAGE]]
            PARTAGE DE VOS INFORMATIONS PERSONNELLES
            <br />
            <br />
            Nous partageons vos Informations personnelles avec des tiers qui
            nous aident à les utiliser aux fins décrites précédemment. Par
            exemple, nous utilisons Shopify pour héberger notre boutique en
            ligne – pour en savoir plus sur l'utilisation de vos Informations
            personnelles par Shopify, veuillez consulter la page suivante :
            https://www.shopify.fr/legal/confidentialite. Nous utilisons
            également Google Analytics pour mieux comprendre comment nos clients
            utilisent le Site – pour en savoir plus sur l'utilisation de vos
            Informations personnelles par Google, veuillez consulter la page
            suivante : https://www.google.com/intl/fr/policies/privacy/. Vous
            pouvez aussi désactiver Google Analytics ici :
            https://tools.google.com/dlpage/gaoptout. <br />
            <br />
            <br />
            <br />
            Enfin, il se peut que nous partagions aussi vos Informations
            personnelles pour respecter les lois et règlementations applicables,
            répondre à une assignation, à un mandat de perquisition ou à toute
            autre demande légale de renseignements que nous recevons, ou pour
            protéger nos droits. <br />
            <br />
            [[INCLURE LE PARAGRAPHE SUIVANT SI VOUS UTILISEZ LE MARKETING DE
            RELANCE OU LA PUBLICITÉ CIBLÉE]] PUBLICITÉ COMPORTEMENTALE
            <br />
            <br />
            Comme indiqué ci-dessus, nous utilisons vos Informations
            personnelles pour vous proposer des publicités ciblées ou des
            messages de marketing qui, selon nous, pourraient vous intéresser.
            Pour en savoir plus sur le fonctionnement de la publicité ciblée,
            vous pouvez consulter la page d'information de la Network
            Advertising Initiative (NAI) à l'adresse suivante :
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
            <br />
            <br />
            Vous pouvez refuser la publicité ciblée ici : <br />
            <br />
            [[ INCLURE LES LIENS DE DÉSACTIVATION DES SERVICES UTILISÉS.
            QUELQUES LIENS COURANTS : FACEBOOK –
            https://www.facebook.com/settings/?tab=ads GOOGLE –
            https://www.google.com/settings/ads/anonymous BING –
            https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees
            ]] <br />
            <br />
            En outre, vous pouvez refuser certains de ces services en vous
            rendant sur le portail de désactivation de Digital Advertising
            Alliance à l'adresse suivante :
            https://optout.aboutads.info/?c=3&lang=fr.
            <br />
            <br />
            NE PAS SUIVRE
            <br />
            <br />
            Veuillez noter que nous ne modifions pas la collecte de données de
            notre Site et nos pratiques d'utilisation lorsque nous détectons un
            signal « Ne pas suivre » sur votre navigateur. <br />
            <br />
            [[INCLURE LE PARAGRAPHE SUIVANT SI VOUS VOUS SITUEZ EN EUROPE OU SI
            VOTRE BOUTIQUE A DES CLIENTS EN EUROPE]]
            <br />
            <br />
            VOS DROITS
            <br />
            <br />
            Si vous êtes résident(e) européen(ne), vous disposez d'un droit
            d'accès aux informations personnelles que nous détenons à votre
            sujet et vous pouvez demander à ce qu'elles soient corrigées, mises
            à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez
            nous contacter au moyen des coordonnées précisées ci-dessous. Par
            ailleurs, si vous êtes résident(e) européen(ne), notez que nous
            traitons vos informations dans le but de remplir nos obligations
            contractuelles à votre égard (par exemple si vous passez une
            commande sur le Site) ou de poursuivre nos intérêts commerciaux
            légitimes, énumérés ci-dessus. Veuillez également noter que vos
            informations seront transférées hors de l'Europe, y compris au
            Canada et aux États-Unis.
            <br />
            <br />
            RÉTENTION DES DONNÉES
            <br />
            <br />
            Lorsque vous passez une commande par l'intermédiaire du Site, nous
            conservons les Informations sur votre commande dans nos dossiers,
            sauf si et jusqu'à ce que vous nous demandiez de les supprimer.
            <br />
            <br />
            [[INSÉRER LE PARAGRAPHE SUIVANT EN CAS D'OBLIGATION D'ÂGE MINIMUM]]
            MINEURS
            <br />
            Le Site n'est pas destiné aux individus de moins de [[INSÉRER
            L'ÂGE]].
            <br />
            <br />
            CHANGEMENTS
            <br />
            <br />
            Nous pouvons être amenés à modifier la présente politique de
            confidentialité de temps à autre afin d'y refléter, par exemple, les
            changements apportés à nos pratiques ou pour d'autres motifs
            opérationnels, juridiques ou réglementaires. NOUS CONTACTER
            <br />
            <br />
            Pour en savoir plus sur nos pratiques de confidentialité, si vous
            avez des questions ou si vous souhaitez déposer une réclamation,
            veuillez nous contacter par e-mail à winepal.entreprise@gmail.com,
            ou par courrier à l'adresse suivante :
            <br />
            <br />
            68 rue de Peuille, CHÂTILLON-COLIGNY, 45230, France
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
