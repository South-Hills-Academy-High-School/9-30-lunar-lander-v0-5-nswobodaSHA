namespace SpriteKind {
    export const map = SpriteKind.create()
    export const rocketengine = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    apple.ay = 25 * Math.sin(angle)
    apple.ax = 25 * Math.cos(angle)
    fireball.setFlag(SpriteFlag.Invisible, false)
    rocketflag = 1
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += 15 * (3.14 / 180)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.darkGroundNorthWest1, function (sprite, location) {
    if (Math.abs(apple.vx) > 20 || apple.vy > 50) {
        explosion = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 2 2 . . 2 2 . 2 . . . . . 
            . . . 2 2 2 . 2 2 . 2 2 . . . . 
            . . . . 2 2 2 . 2 2 2 2 2 . . . 
            . . 2 2 . . 2 2 2 2 2 2 . . . 2 
            . . 2 2 2 2 2 4 4 4 4 2 . 2 2 2 
            . . . 2 2 2 4 4 4 4 4 2 2 2 2 . 
            . . 2 2 2 4 4 4 4 4 4 4 4 2 2 . 
            . 2 2 4 4 5 4 4 4 5 4 5 4 2 2 . 
            . 2 2 4 4 4 4 4 5 5 4 4 4 4 2 2 
            2 2 2 4 4 4 4 4 5 5 4 4 4 4 2 2 
            2 2 4 4 4 4 5 5 5 5 5 5 4 4 2 2 
            2 4 4 4 4 5 5 5 4 5 5 5 5 4 4 2 
            2 4 4 4 5 5 5 5 5 5 5 5 5 4 4 2 
            2 4 4 4 5 5 5 5 5 5 5 5 5 4 4 2 
            `, SpriteKind.Player)
        explosion.setPosition(apple.x, apple.y)
        scene.cameraFollowSprite(explosion)
        pause(1000)
        game.over(false)
    } else {
        if (landingflag == 0) {
            fuel += 500
            landingflag = 1
        }
    }
    apple.setVelocity(0, -1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    angle += -15 * (3.14 / 180)
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    apple.ay = 20
    fireball.setFlag(SpriteFlag.Invisible, true)
    rocketflag = 0
})
let explosion: Sprite = null
let apple: Sprite = null
let angle = 0
let fireball: Sprite = null
let rocketflag = 0
let landingflag = 0
landingflag = 0
let fuel = 10000
let fuelsprite = textsprite.create(convertToText(fuel))
rocketflag = 0
fireball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . 4 4 4 5 5 4 4 4 . . . . 
    . . . 3 3 3 3 4 4 4 4 4 4 . . . 
    . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
    . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
    . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
    . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
    . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
    . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
    . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
    . . . 4 2 2 2 2 2 2 2 2 4 . . . 
    . . . . 4 4 2 2 2 2 4 4 . . . . 
    . . . . . . 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
fireball.setFlag(SpriteFlag.Invisible, true)
angle = 0
tiles.setCurrentTilemap(tilemap`level2`)
effects.clouds.startScreenEffect()
apple = sprites.create(img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `, SpriteKind.Player)
let engine = sprites.create(img`
    7 3 
    3 7 
    `, SpriteKind.rocketengine)
scene.cameraFollowSprite(apple)
scaling.scaleByPercent(apple, -25, ScaleDirection.Uniformly, ScaleAnchor.Middle)
apple.ay = 20
let myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
let minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
game.onUpdate(function () {
    fuelsprite.destroy()
    fuelsprite = textsprite.create(convertToText(fuel))
    minimap2.destroy()
    myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 0)
    minimap.includeSprite(myMinimap, apple, MinimapSpriteScale.MinimapScale)
    minimap2 = sprites.create(minimap.getImage(myMinimap), SpriteKind.map)
    minimap2.setPosition(apple.x - 50, apple.y - 20)
    engine.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
    fireball.setPosition(apple.x + -8 * Math.cos(angle), apple.y + -8 * Math.sin(angle))
    fuelsprite.setPosition(apple.x - 50, apple.y - 50)
    if (rocketflag == 1) {
        fuel += -10
    }
    if (apple.y < 150) {
        landingflag = 0
    }
})
