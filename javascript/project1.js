function init() {
    window.addEventListener('resize', onResize, false);

    let clock = new THREE.Clock();
    const time = clock.getElapsedTime();
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 800);
    camera.position.z = 1;
    camera.position.y = 0;


    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.shadowSide = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    let textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
    });

    let loader = new THREE.FontLoader();
    loader.load('font/Angle_Regular.json.txt', function (font) {
        let textGallery = new THREE.TextGeometry('Gallery', {
            font: font,
            size: 0.15,
            height: 0
        });

        let moveMouse = new THREE.TextGeometry('move your mouse \n\n      to scroll', {
            font: font,
            size: 0.05,
            height: 0
        });
        textGallery.center();
        moveMouse.center();
        let textMesh = new THREE.Mesh(textGallery, textMaterial);
        let moveMouseMesh = new THREE.Mesh(moveMouse, textMaterial);
        textMesh.position.y = 0.7;
        textMesh.position.z = -1.5;
        moveMouseMesh.position.y = 0.3;
        moveMouseMesh.position.z = -1.5;
        scene.add(textMesh);
        scene.add(moveMouseMesh);
    });





    var planeGeo = new THREE.PlaneGeometry(2, 2);


    var materials1 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/cheers.jpg')
        })

    ];

    let materials2 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/hirschmensch.png')
        })

    ];

    let materials3 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/deathstareclipse.png')
        })
    ];

    let materials4 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/ELLogoKonzeption.jpg')
        })
    ];

    let materials5 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/buch1.jpg')
        })
    ];

    let materials6 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/buch2.jpg')
        })
    ];

    let materials7 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/demoman.jpg')
        })

    ];

    let materials8 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/renderRoom.jpg')
        })

    ];

    let materials9 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/landscaperender.png')
        })
    ];

    let materials10 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/coca.jpg')
        })
    ];

    let materials11 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/kopf.jpg')
        })
    ];

    let materials12 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/spaceKopf.jpg')
        })
    ];

    let materials13 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/mozart.jpg')
        })
    ];

    let materials14 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/holoHead.jpg')
        })
    ];

    let materials15 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/astroboi.png')
        })
    ];

    let materials16 = [

        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('gallery/dosenKopf.jpg')
        })
    ];


    let materialArray = [
        materials1,
        materials2,
        materials3,
        materials4,
        materials5,
        materials6,
        materials7,
        materials8,
        materials9,
        materials10,
        materials11,
        materials12,
        materials13,
        materials14,
        materials15,
        materials16
    ]

    let galleryDescrs = [
        'Cheers Cocktailbar \n \n -Illustrator',
        'Stay Classy \n \n -Photoshop',
        'Totale Mondfinsternis \n \n -Photoshop',
        'Elke Logo \n \n -Illustrator',
        'Eiskalter Tod \n im Schattenrock  \n \n -Photoshop',
        'Marie & Else \n \n -Photoshop',
        'Demoman \n \n -Source Film Maker',
        'LazerRoom \n \n -Blender & Photoshop',
        'LowPoly \n \n -Blender',
        'Soda \n \n -Photoshop',
        'Self Potrait \n \n -Photoshop',
        'Cartoon Avatar \n \n -Photoshop',
        'Mozart \n \n -Photoshop',
        'RetroHead \n \n -Photoshop',
        'Austronaut \n \n -Photoshop',
        'CAN \n \n -Photoshop'
    ]

    let descsGallery;

    for (let j = 0; j < 16; j++) {
        plane = new THREE.Mesh(planeGeo, materialArray[j]);
        plane.name = "name" + j;
        plane.position.y = -1 - (j / 0.4);
        plane.position.z = -3;
        plane.receiveShadow = true;
        scene.add(plane);
    }

    for (let j = 0; j < 16; j++) {
        loader.load('font/Angle_Regular.json.txt', function (font) {
            descsGallery = new THREE.TextGeometry(galleryDescrs[j], {
                font: font,
                size: 0.045,
                height: 0
            });
            descsGallery.center();
            let descGalleryMesh = new THREE.Mesh(descsGallery, textMaterial);
            descGalleryMesh.position.y = -0.9 - (j / 0.4);
            descGalleryMesh.position.z = -1.5;
            descGalleryMesh.position.x = 0;
            descGalleryMesh.castShadow = true;
            scene.add(descGalleryMesh);
        });
    }

let spotLightIntens = 3;
    let spotLight = new THREE.SpotLight(0x999999, spotLightIntens , 35, Math.PI / 5.1, 1, 2);
    spotLight.position.y = 0;
    spotLight.position.z = 4;
    spotLight.castShadow = true;
    spotLight.target.position.y = 0;
    scene.add(spotLight);
    scene.add(spotLight.target);


    var renderScene = function () {
        target.y = mouse.y;
        //target.y = (1 - mouse.y) * 0.5;

        moveCameraWithMouseMove();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };




    function onMouseMovement( event ) {
        mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    function moveCameraWithMouseMove() {
        camera.position.y += 0.015 * (1 * target.y);
        spotLight.position.y += 0.015 * (1 * target.y);
        spotLight.target.position.y += 0.015 * (1 * target.y);
        camera.position.clampScalar(-38, 0.1);
        spotLight.position.clampScalar(-38, 0.1);
        spotLight.target.position.clampScalar(-38, 0.1);
    }

    //document.addEventListener('mousemove', onMouseMove, false);

    function onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

 


    window.addEventListener('mousemove', onMouseMovement, false);

    renderScene();

}