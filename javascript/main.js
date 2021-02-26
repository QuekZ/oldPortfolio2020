function init() {


    let stats = initStats();

    let composer, shaderTime = 0,
        badTVPass, staticPass, rgbPass, filmPass, renderPass,
        copyPass;

    let clock = new THREE.Clock();
    const time = clock.getElapsedTime();
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 700);
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    //let cameraHelper = new THREE.CameraHelper(camera);
    //scene.add(cameraHelper);

    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);


    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = true;

    // create the ground plane
    let planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.y = 0;
    plane.rotation.z = 0;
    plane.position.x = 0;
    plane.position.y = -1;
    plane.position.z = 0;
    scene.add(plane);

    const planeEdgesGeo = new THREE.EdgesGeometry(planeGeometry);
    const planeWireframe = new THREE.LineSegments(planeEdgesGeo, new THREE.LineBasicMaterial({
        color: 0xffffff
    }));
    plane.add(planeWireframe);


    /*let textureList = [
        'images/smiley1.png',
        'images/smiley2.png',
        'images/smiley3.png',
        'images/logoTexture.png'
    ];*/
    //let randIndex = THREE.Math.randInt(0, textureList.length - 1);
    //let randTexture = new THREE.TextureLoader().load(textureList[randIndex]);

    let textureGroup = new THREE.Mesh();
    let cubeMaterial = [];
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));
    cubeMaterial.push(new THREE.MeshBasicMaterial({
        color: 0x000000
    }));



    let cubeGeometry;
    let cubeMesh;

    for (let x = 0; x < 1; x++) {
        for (let y = 0; y < 1; y++) {
            for (let z = 0; z < 1; z++) {
                cubeGeometry = new THREE.BoxBufferGeometry(7, 7, 7);
                cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
                textureGroup.add(cubeMesh);
            }
        }
    }

    scene.add(cubeMesh);

    cubeMesh.position.x = -3;
    cubeMesh.position.y = 10;
    cubeMesh.position.z = 3;

    const edgesGeometry = new THREE.EdgesGeometry(cubeGeometry);
    const wireframe = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({
        color: 0xffffff
    }));
    cubeMesh.add(wireframe);

    //let axesHelperPlane = new THREE.AxesHelper(5);
    //plane.add(axesHelperPlane);

    // position and point the camera to the center of the scene
    camera.position.x = -40;
    camera.position.y = 35;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    //####################################

    let strichSprite = new THREE.TextureLoader().load("images/strich.png");
    let spriteMaterial = new THREE.SpriteMaterial({
        map: strichSprite
    });

    let aboutSprite = new THREE.TextureLoader().load("images/about.png");
    let spriteMaterial2 = new THREE.SpriteMaterial({
        map: aboutSprite
    });

    let projectsSprite = new THREE.TextureLoader().load("images/projects.png");
    let spriteMaterial3 = new THREE.SpriteMaterial({
        map: projectsSprite
    });

    let contactSprite = new THREE.TextureLoader().load("images/contact.png");
    let spriteMaterial4 = new THREE.SpriteMaterial({
        map: contactSprite
    })

    let logoSprite = new THREE.TextureLoader().load("images/logoGross.png");
    let spriteMaterial5 = new THREE.SpriteMaterial({
        map: logoSprite
    });

    let strichSpriteV = new THREE.TextureLoader().load("images/strich_v.png");
    let spriteMaterial6 = new THREE.SpriteMaterial({
        map: strichSpriteV
    })






    let about;
    let projects;
    let contact;
    let logo;


    let right = new THREE.Sprite(spriteMaterial);
    scene.add(right);
    right.scale.set(2, 0.1, 1);
    right.position.x = 15;

    let left = new THREE.Sprite(spriteMaterial);
    scene.add(left);
    left.scale.set(2, 0.1, 1);
    left.position.x = -15;

    let front = new THREE.Sprite(spriteMaterial6);
    scene.add(front);
    front.scale.set(0.1, 3, 1);
    front.position.y = -14;

    //####################################

    let group1 = new THREE.Group();
    group1.add(plane);
    group1.add(cubeMesh);
    group1.add(right);
    group1.add(left);
    group1.add(front);
    scene.add(group1);





    //Create Shader Passes
    renderPass = new THREE.RenderPass(scene, camera);
    badTVPass = new THREE.ShaderPass(THREE.BadTVShader);
    rgbPass = new THREE.ShaderPass(THREE.RGBShiftShader);
    filmPass = new THREE.ShaderPass(THREE.FilmShader);
    staticPass = new THREE.ShaderPass(THREE.StaticShader);
    copyPass = new THREE.ShaderPass(THREE.CopyShader);

    //set shader uniforms
    filmPass.uniforms.grayscale.value = 0;





    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(filmPass);
    composer.addPass(badTVPass);
    composer.addPass(rgbPass);
    composer.addPass(staticPass);
    composer.addPass(copyPass);
    copyPass.renderToScreen = true;

    // add the output of the renderer to the html element
    document.getElementById("webgl_content").appendChild(renderer.domElement);

    // call the render function
    let step = 0;
    renderScene();

    function renderScene() {
        stats.update();

        target.x = (1 - mouse.x) * 0.00095;
        target.y = (1 - mouse.y) * 0.00095;

        cubeAnimation();
        colissionDetectionCube();
        controlSettings();
        shaderSettings();
        updateCamera();
        controls.update(time);

        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);

        renderer.render(scene, camera);
        composer.render(0.1);
    }

    function updateCamera() {
        camera.updateProjectionMatrix();
    }




    /*function onResize(event) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        windowHalf.set(width / 2, height / 2);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }*/

    function onResize( event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onResize, false);



    function colissionDetectionCube() {
        if (group1.position.x < -14.5) {
            group1.position.x -= 0.3 * (-1 * target.x);
            //group1.position.z -= 0.3 * (-1 * target.x);
            group1.position.y -= 0.3 * (-1 * target.y);
        } else if (group1.position.x > 14.5) {
            group1.position.x -= 0.3 * (-1 * target.x);
            //group1.position.z -= 0.3 * (-1 * target.x);
        }

        if (group1.position.y > 8.5) {
            group1.position.y -= 0.6 * target.y;

        } else if (group1.position.y < -8.5) {
            group1.position.y -= 0.6 * target.y;

        }
    }

    function controlSettings() {
        controls.target.set(0, 0, 0);
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.dampingFactor = 1;
        controls.minAzimuthAngle = 0;
        controls.maxAzimuthAngle = 0;
        controls.minPolarAngle = 0.999;
        controls.maxPolarAngle = 1;
        controls.enableKeys = false;
    }

    function shaderSettings() {
        shaderTime += 0.1;
        badTVPass.uniforms['time'].value = shaderTime;
        filmPass.uniforms['time'].value = shaderTime;
        //staticPass.uniforms['time'].value += Math.cos(step * 0.1) - 0.08;
        rgbPass.uniforms['amount'].value += (0.0001 * Math.cos(step / 1.2));

    }


    function cubeAnimation() {
        step += 0.03;

        cubeMesh.rotation.y += 0.03 * Math.cos(step / 1.5) + 0;
        cubeMesh.position.x = 3 * Math.cos(step) / 1.5 + 0;
        cubeMesh.position.z = 3 * Math.sin(step / 1.5) + 0;
        cubeMesh.position.y = 5 + (3 * Math.abs(Math.sin(step)));
        cubeMesh.scale.set(0.5 * Math.cos(step * 0.5) + 1.2, 0.5 * Math.cos(step * 0.5) + 1.2, 0.5 * Math.cos(step * 0.5) + 1.2);
        group1.position.x += 0.3 * (-1 * target.x);
        group1.position.y += 0.3 * (1 * target.y);
    }

    let aboutTab = document.getElementById("aboutBtn");
    let projectTab = document.getElementById("projectBtn");
    let contactTab = document.getElementById("contactBtn");
    let logoHoverImg = document.getElementById("logoImg");
    let webglContent = document.getElementById("webgl_content");






    function showSpriteHoverAbout() {
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 2; j++) {
                about = new THREE.Sprite(spriteMaterial2);
                about.name = "name" + (i * j);
                about.scale.set(13, 13, 13);
                about.position.x = -20 + (i / 0.07);
                about.position.y = 15 - j / 0.07;
                about.position.z = -15;

                scene.add(about);
            }
        }
        scene.remove(group1);
    }

    function showSpriteHoverProjects() {
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 2; j++) {
                projects = new THREE.Sprite(spriteMaterial3);
                projects.name = "name" + (i * j);
                projects.scale.set(13, 13, 13);
                projects.position.x = -20 + (i / 0.07);
                projects.position.y = 15 - j / 0.07;
                projects.position.z = -15;

                scene.add(projects);
            }

        }
        scene.remove(group1);
    }


    function showSpriteHoverContact() {
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 2; j++) {
                contact = new THREE.Sprite(spriteMaterial4);
                contact.name = "name" + (i * j);
                contact.scale.set(13, 13, 13);
                contact.position.x = -20 + (i / 0.07);
                contact.position.y = 15 - j / 0.07;
                contact.position.z = -15;
                scene.add(contact);
            }
        }
        scene.remove(group1);
    }


    function showLogoSprite() {

        logo = new THREE.Sprite(spriteMaterial5);
        logo.name = "name";
        logo.scale.set(10, 10, 10);
        logo.position.x = 0;
        logo.position.y = 12;
        logo.position.z = 15;
        scene.add(logo);
        scene.remove(group1);

    }



    function deleteSprite() {
        for (let i = 1; i <= 15; i++) {
            for (let j = 1; j <= 3; j++) {
                scene.remove(scene.getObjectByName("name" + (i * j)));
            }
        }
        scene.add(group1);
        group1.position.set(0, 0, 0);

    }

    function deleteLogoSprite() {
        scene.remove(logo);
        scene.add(group1);
        group1.position.set(0, 0, 0);
    }





    aboutTab.addEventListener("mouseover", showSpriteHoverAbout, false);
    aboutTab.addEventListener("mouseleave", deleteSprite, false);
    projectTab.addEventListener("mouseover", showSpriteHoverProjects, false);
    projectTab.addEventListener("mouseleave", deleteSprite, false);
    contactTab.addEventListener("mouseover", showSpriteHoverContact, false);
    contactTab.addEventListener("mouseleave", deleteSprite, false);
    logoHoverImg.addEventListener("mouseover", showLogoSprite, false);
    logoHoverImg.addEventListener("mouseleave", deleteLogoSprite, false);
    //webglContent.addEventListener("mousedown", doStuff, false);



    function onMouseMove(event) {
        mouse.x = (event.clientX - windowHalf.x);
        mouse.y = (event.clientY - windowHalf.y);

        target.x = (1 - mouse.x) * 0.002;
        target.y = (1 - mouse.y) * 0.002;
    }

    document.addEventListener('mousemove', onMouseMove, false);

}