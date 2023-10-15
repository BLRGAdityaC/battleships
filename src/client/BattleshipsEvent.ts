class BattleshipsEvent {
    public static readonly EVENT_CHANNEL_NAME_SYSTEM: string = 'system';
    public static readonly EVENT_CHANNEL_NAME_GAME: string = 'game';
    public static readonly EVENT_TYPE_CONNECTED: string = 'connected';
    public static readonly EVENT_TYPE_WAITING: string = 'waiting';
    public static readonly EVENT_TYPE_JOINED: string = 'joined';
    public static readonly EVENT_TYPE_LEFT: string = 'left';
    public static readonly EVENT_TYPE_SHOT: string = 'shot';
    public static readonly EVENT_TYPE_ANNOUNCE: string = 'announce';
    public static readonly EVENT_TYPE_ROUND: string = 'round';
    public static readonly EVENT_TYPE_GAME_RESULT: string = 'game_result';
    public static readonly GAME_RESULT_WIN: string = 'win';
    public static readonly GAME_RESULT_DRAW: string = 'draw';
    public static readonly GAME_RESULT_DEFEAT: string = 'defeat';
}

export default BattleshipsEvent