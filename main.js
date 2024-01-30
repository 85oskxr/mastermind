let game = new MasterMind({
    pinLength: 4,
    attempts: 15,
    repetitionOfNumbers: false,
    elementIds: {
        label: 'label',
        pinInput: 'pin',
        results: 'result'
    }
})

game.run()