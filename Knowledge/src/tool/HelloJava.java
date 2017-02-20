package tool;
import java.util.ArrayList;
import java.util.List;

import processing.core.PApplet;
import tool.Ball;


public class HelloJava extends PApplet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String str;
	
	List<Ball> balls = new ArrayList<Ball>();
	
	public void setup() {
		size(300, 500);
		str = "haha 1 2 33";
		for (String s: str.split("[0-9]+")) {
			System.out.println(s);
		}
	}
	
	public void draw() {
		for (Ball ball : balls) {
			ball.drawShape();
		}
	}

	public void keyPressed() {
		if (key == 'n') {
			balls.add(new Ball(this));
		}
	}
}
