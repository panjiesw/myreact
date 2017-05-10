declare module 'firebase-server' {
	namespace FirebaseServer {
		interface FirebaseServerClass {
			close(cb?: () => void): void;
			getValue(): Promise<any>;
			exportData(): Promise<any>;
			setRules(rules: any): void;
			setAuthSecret(secret: any): void;
			setTime(timestamp: any): void;
		}
	}

	var FirebaseServer: {
		new (port: number, name?: string, data?: any): FirebaseServer.FirebaseServerClass;
	};

	export = FirebaseServer;
}
